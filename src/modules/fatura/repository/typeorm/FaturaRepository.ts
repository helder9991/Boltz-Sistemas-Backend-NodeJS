import crypto from 'crypto'
import type IFaturaRepository from '../interfaces/IFaturaRepository'
import { type Repository } from 'typeorm'
import typeORMConnection from 'database/typeorm'
import Fatura from '../../entities/Fatura'
import type IUploadFaturaDTO from '../../dtos/UploadFaturaDTO'

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
}

export default FaturaRepository
