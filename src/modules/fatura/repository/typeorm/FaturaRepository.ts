import crypto from 'crypto'
import type IFaturaRepository from '../interfaces/IFaturaRepository'
import { type Repository } from 'typeorm'
import typeORMConnection from 'database/typeorm'
import Fatura from '../../entities/Fatura'
import type IUploadFaturaDTO from '../../dtos/IUploadFaturaDTO'
import type IFindFaturaDTO from 'modules/fatura/dtos/IFindFaturaDTO'
import type IListFaturaByInstalacaoDTO from 'modules/fatura/dtos/IListFaturaByInstalacaoDTO'
import { type QntItensSalvos } from '../interfaces/IFaturaRepository'

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
  }: IListFaturaByInstalacaoDTO): Promise<[Fatura[], QntItensSalvos]> {
    const faturas = await this.repository.findAndCount({
      select: ['id', 'mesReferencia', 'mesVencimento', 'total'],
      where: {
        idInstalacao,
      },
      order: {
        mesReferencia: 'DESC',
      },
      skip: (pagina - 1) * FaturasPorPagina, // Calcula o número de registros a serem pulados na consulta
      take: FaturasPorPagina,
    })

    return faturas
  }
}

export default FaturaRepository
