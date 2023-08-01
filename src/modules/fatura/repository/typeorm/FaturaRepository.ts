import crypto from 'crypto'
import type IFaturaRepository from '../interfaces/IFaturaRepository'
import { Between, type Repository } from 'typeorm'
import typeORMConnection from 'database/typeorm'
import Fatura from '../../entities/Fatura'
import type IUploadFaturaDTO from '../../dtos/IUploadFaturaDTO'
import type IFindFaturaDTO from 'modules/fatura/dtos/IFindFaturaDTO'
import type IListFaturaByInstalacaoDTO from 'modules/fatura/dtos/IListFaturaByInstalacaoDTO'
import {
  type IDashboard,
  type QntItensSalvos,
} from '../interfaces/IFaturaRepository'
import { limitesDoMes } from 'utils/data'

const FaturasPorPagina = 6

class FaturaRepository implements IFaturaRepository {
  private readonly repository: Repository<Fatura>

  constructor() {
    this.repository = typeORMConnection.getRepository(Fatura)
  }

  async upload(dados: IUploadFaturaDTO): Promise<Fatura> {
    const fatura = this.repository.create({
      id: crypto.randomUUID(),
      ...dados,
    })

    await this.repository.save(fatura)

    return fatura
  }

  async find({
    idInstalacao,
    mesReferencia,
    id,
  }: IFindFaturaDTO): Promise<Fatura | null> {
    const fatura = await this.repository.findOne({
      where: [{ idInstalacao, mesReferencia }, { id }],
    })

    return fatura
  }

  async listByInstalacao({
    idInstalacao,
    pagina = 1,
    data,
  }: IListFaturaByInstalacaoDTO): Promise<[Fatura[], QntItensSalvos]> {
    const whereClause: any = { idInstalacao }

    if (data !== undefined) {
      // Se a data for fornecida, filtra pelo mês referência
      const { inicio, fim } = limitesDoMes(data)
      whereClause.mesReferencia = Between(inicio, fim)
    }

    const faturas = await this.repository.findAndCount({
      select: ['id', 'mesReferencia', 'mesVencimento', 'total'],
      where: whereClause,
      order: {
        mesReferencia: 'DESC',
      },
      skip: (pagina - 1) * FaturasPorPagina, // Calcula o número de registros a serem pulados na consulta
      take: FaturasPorPagina,
    })

    return faturas
  }

  async dashboard(): Promise<IDashboard> {
    const query1 = await typeORMConnection.query(`
      SELECT SUM(total) valortotal, SUM("energiaEletricaValor") energiaeletricavalortotal, SUM("energiaInjetadaValor") energiainjetadavalortotal, 
      SUM("contribIlumPublicaMunicipalValor") contribilumpublicamunicipalvalortotal
      FROM faturas;
    `)
    const query2 = await typeORMConnection.query(`
      SELECT COUNT("numInstalacao") numinstalacao
      FROM instalacoes;
    `)

    const dataAtual = new Date()
    const seteMesesAtras = new Date()
    seteMesesAtras.setMonth(dataAtual.getMonth() - 7)

    let truncaData = 'DATE_TRUNC'
    let formataData = "'month'"

    if (typeORMConnection.driver.options.type === 'sqlite') {
      truncaData = 'STRFTIME'
      formataData = "'%m/%Y'"
    }

    const query3 = await typeORMConnection.query(
      `
      SELECT ${truncaData}(${formataData}, "mesReferencia") mesreferencia, SUM("energiaEletricaValor") energiaeletricavalor, 
        SUM("energiaInjetadaValor") energiainjetadavalor, SUM("enCompSemICMSValor") encompsemicmsvalor, 
        SUM("contribIlumPublicaMunicipalValor") contribilumpublicamunicipalvalor 
      FROM faturas
      WHERE "mesReferencia" BETWEEN '${seteMesesAtras.toISOString()}' AND '${dataAtual.toISOString()}'
      GROUP BY ${truncaData}(${formataData}, "mesReferencia")
      ORDER BY ${truncaData}(${formataData}, "mesReferencia");
    `,
    )
    const dashboard: IDashboard = {
      qntUC: Number(query2[0].numinstalacao),
      resumo7meses: query3.map((row: any) => ({
        mesReferencia: row.mesreferencia,
        energiaEletricaValor: row.energiaeletricavalor,
        energiaInjetadaValor: row.energiainjetadavalor,
        enCompSemICMSValor: row.encompsemicmsvalor,
        contribIlumPublicaMunicipalValor: row.contribilumpublicamunicipalvalor,
      })),
      valorTotal: query1[0].valortotal,
      totalEnergiaEletrica: query1[0].energiaeletricavalortotal,
      totalEnergiaInjetada: query1[0].energiainjetadavalortotal,
      totalContribIlumPublicaMunicipal:
        query1[0].contribilumpublicamunicipalvalortotal,
    }

    return dashboard
  }
}

export default FaturaRepository
