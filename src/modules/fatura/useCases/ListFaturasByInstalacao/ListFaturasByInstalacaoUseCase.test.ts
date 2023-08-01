import 'reflect-metadata'
import path from 'path'
import ListFaturasByInstalacaoUseCase from './ListFaturasByInstalacaoUseCase'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'
import UploadFaturaUseCase from '../UploadFatura/UploadFaturaUseCase'
import FindInstalacaoUseCase from 'modules/instalacao/useCases/FindInstalacao/FindInstalacaoUseCase'
import Fatura from 'modules/fatura/entities/Fatura'

let listFaturasByInstalacao: ListFaturasByInstalacaoUseCase
let findInstalacao: FindInstalacaoUseCase
let faturaRepository: FaturaRepository
let uploadFatura: UploadFaturaUseCase
let instalacaoRepository: InstalacaoRepository
let idInstalacao: string

describe('ListFaturasByInstalacao', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      instalacaoRepository = new InstalacaoRepository()
      listFaturasByInstalacao = new ListFaturasByInstalacaoUseCase(
        faturaRepository,
        instalacaoRepository,
      )
      uploadFatura = new UploadFaturaUseCase(
        faturaRepository,
        instalacaoRepository,
      )
      findInstalacao = new FindInstalacaoUseCase(instalacaoRepository)

      await limpaTabelasNosTestes()

      // Cadastra faturas
      const assetsFolder = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'assets',
      )
      let filepath = path.join(assetsFolder, 'test-file1.pdf')

      const response1 = await uploadFatura.execute({ filepath })

      filepath = path.join(assetsFolder, 'test-file2.pdf')

      await uploadFatura.execute({ filepath })

      // Pega o id da instalacao das faturas cadastradas

      const instalacao = await findInstalacao.execute({
        numInstalacao: response1.numInstalacao,
      })

      idInstalacao = instalacao.id
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de listar as faturas a partir de um idInstalacao', async () => {
    const [faturas, qntItensSalvos] = await listFaturasByInstalacao.execute({
      idInstalacao,
    })

    expect(faturas.every((fatura) => fatura instanceof Fatura)).toBe(true)
    expect(qntItensSalvos).toBe(2)
  })

  it('Deve ser capaz de filtrar as faturas a partir do mes', async () => {
    const [faturas, qntItensSalvos] = await listFaturasByInstalacao.execute({
      idInstalacao,
      data: new Date('06/01/2023'),
    })

    expect(faturas.every((fatura) => fatura instanceof Fatura)).toBe(true)
    expect(qntItensSalvos).toBe(1)
  })

  it('Nao deve ser capaz de listar as faturas a partir de um idInstalacao nao existente', async () => {
    await expect(
      listFaturasByInstalacao.execute({
        idInstalacao: 'id-nao-existente',
      }),
    ).rejects.toHaveProperty('message', 'Esta instalacao nao existe.')
  })
})
