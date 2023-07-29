import crypto from 'crypto'
import type IFaturaRepository from '../interfaces/IFaturaRepository'
import { type Repository } from 'typeorm'
import typeORMConnection from 'database/typeorm'
import Fatura from '../../entities/Fatura'
import type IUploadFaturaDTO from '../../dtos/UploadFaturaDTO'
import type IFindFaturaDTO from 'modules/fatura/dtos/IFindFaturaDTO'

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
}

export default FaturaRepository
