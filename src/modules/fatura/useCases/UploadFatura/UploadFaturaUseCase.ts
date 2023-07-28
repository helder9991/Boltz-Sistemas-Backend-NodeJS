import fs from 'fs'
import { inject, injectable } from 'tsyringe'
import PDFParser from 'pdf-parse'
import type IUploadFaturaDTO from 'modules/fatura/dtos/UploadFaturaDTO'
import IFaturaRepository from 'modules/fatura/repository/interfaces/IFaturaRepository'
import formataDataParaJSDate from 'utils/formataDataParaJSDate'
import IInstalacaoRepository from 'modules/instalacao/repository/interface/IInstalacaoRepository'
import type Fatura from 'modules/fatura/entities/Fatura'

interface IUploadFaturaParams {
  filepath: string
}

type IParsedData = Omit<IUploadFaturaDTO, 'filepath' | 'idInstalacao'> & {
  numCliente: number
  numInstalacao: number
}

@injectable()
class UploadFaturaUseCase {
  constructor(
    @inject('FaturaRepository')
    private readonly faturaRepository: IFaturaRepository,
    @inject('InstalacaoRepository')
    private readonly instalacaoRepository: IInstalacaoRepository,
  ) {}

  formataLinha(line: string): string[] {
    return line
      .trim()
      .replace(/\s{2,}/g, ' ') // remove os espaços
      .replace(/(\d)\.(\d)/g, '') // remove o ponto
      .replace(/,/g, '.') // troca virgula por ponto
      .split(' ') // separa em array
  }

  getDadosFatura(linhas: string[]): IParsedData {
    const dadosFatura: IParsedData = {
      total: 0,
      mesReferencia: new Date(),
      mesVencimento: new Date(),
      numCliente: 0,
      numInstalacao: 0,
      energiaEletricaUnidade: '',
      energiaEletricaQuantidade: 0,
      energiaEletricaPrecoUnidade: 0,
      energiaEletricaValor: 0,
      contribIlumPublicaMunicipalValor: 0,
    }

    // Pega o valor total da fatura
    for (const [numLinha, textoLinha] of linhas.entries()) {
      // Recupera o mes de referencia, a data de vencimento e o valor total
      if (textoLinha.includes('Referente a')) {
        const data = this.formataLinha(linhas[numLinha + 1])

        dadosFatura.mesReferencia = formataDataParaJSDate(data[0])
        dadosFatura.mesVencimento = formataDataParaJSDate(data[1])
        dadosFatura.total = Number(data[2])
        continue
      }

      // Recupera o Numero do Cliente e o Numero da Instalacao
      if (textoLinha.includes('Nº DO CLIENTE')) {
        const dados = this.formataLinha(linhas[numLinha + 1])

        dadosFatura.numCliente = Number(dados[0])
        dadosFatura.numInstalacao = Number(dados[1])
        continue
      }

      // Recupera as informações relativa a energia eletrica
      if (textoLinha.startsWith('Energia Elétrica')) {
        const dados = this.formataLinha(
          textoLinha.replace('Energia Elétrica', ''),
        ) // remove a palavra 'Energia Eletrica'

        dadosFatura.energiaEletricaUnidade = dados[0]
        dadosFatura.energiaEletricaQuantidade = Number(dados[1])
        dadosFatura.energiaEletricaPrecoUnidade = Number(dados[2])
        dadosFatura.energiaEletricaValor = Number(dados[3])
        continue
      }

      // Recupera as informações relativa a Energia Injetada
      if (textoLinha.startsWith('Energia injetada')) {
        const dados = this.formataLinha(
          textoLinha.replace('Energia injetada HFP', ''),
        ) // remove a palavra 'Energia injetada HFP'

        dadosFatura.energiaInjetadaUnidade = dados[0]
        dadosFatura.energiaInjetadaQuantidade = Number(dados[1])
        dadosFatura.energiaInjetadaPrecoUnidade = Number(dados[2])
        dadosFatura.energiaInjetadaValor = Number(dados[3])
        continue
      }

      // Recupera as informações relativa a En Comp. S/ ICMS
      if (textoLinha.startsWith('En comp. s/ ICMS')) {
        const dados = this.formataLinha(
          textoLinha.replace('En comp. s/ ICMS', ''),
        ) // remove a palavra 'En comp. s/ ICMS'

        dadosFatura.enCompSemICMSUnidade = dados[0]
        dadosFatura.enCompSemICMSQuantidade = Number(dados[1])
        dadosFatura.enCompSemICMSPrecoUnidade = Number(dados[2])
        dadosFatura.enCompSemICMSValor = Number(dados[3])
        continue
      }

      // Recupera as informações relativa a Energia compensada
      if (textoLinha.startsWith('Energia compensada GD I')) {
        const dados = this.formataLinha(
          textoLinha.replace('Energia compensada GD I', ''),
        ) // remove a palavra 'Energia compensada GD I'

        dadosFatura.energiaCompensadaUnidade = dados[0]
        dadosFatura.energiaCompensadaQuantidade = Number(dados[1])
        dadosFatura.energiaCompensadaPrecoUnidade = Number(dados[2])
        dadosFatura.energiaCompensadaValor = Number(dados[3])
        continue
      }

      // Recupera as informações relativa a Energia SCEE
      if (textoLinha.startsWith('Energia SCEE s/ ICMS')) {
        const dados = this.formataLinha(
          textoLinha.replace('Energia SCEE s/ ICMS', ''),
        ) // remove a palavra 'Energia SCEE s/ ICMS'

        dadosFatura.energiaSCEEUnidade = dados[0]
        dadosFatura.energiaSCEEQuantidade = Number(dados[1])
        dadosFatura.energiaSCEEPrecoUnidade = Number(dados[2])
        dadosFatura.energiaSCEEValor = Number(dados[3])
        continue
      }

      // Recupera as informações relativa a Contrib Ilum Publica Municipal
      if (textoLinha.includes('Contrib Ilum Publica Municipal')) {
        const dados = this.formataLinha(
          textoLinha.replace('Contrib Ilum Publica Municipal', ''),
        ) // remove a palavra 'Contrib Ilum Publica Municipal '

        dadosFatura.contribIlumPublicaMunicipalValor = Number(dados[0])
        continue
      }
    }

    return dadosFatura
  }

  async parserPDF(filepath: string): Promise<IParsedData> {
    const pdfBuffer = fs.readFileSync(filepath)
    const pdf = await PDFParser(pdfBuffer)

    const linhas = pdf.text.split('\n')
    return this.getDadosFatura(linhas)
  }

  async execute({ filepath }: IUploadFaturaParams): Promise<Fatura> {
    const dadosFatura = await this.parserPDF(filepath)

    let instalacaoExiste = await this.instalacaoRepository.find({
      numInstalacao: dadosFatura.numInstalacao,
    })

    if (instalacaoExiste === null) {
      instalacaoExiste = await this.instalacaoRepository.create({
        numCliente: dadosFatura.numCliente,
        numInstalacao: dadosFatura.numInstalacao,
      })
    }

    const fatura = await this.faturaRepository.upload({
      ...dadosFatura,
      filepath,
      idInstalacao: instalacaoExiste.id,
    })

    return fatura
  }
}

export default UploadFaturaUseCase
