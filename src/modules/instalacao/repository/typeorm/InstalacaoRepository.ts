import crypto from 'crypto'
import { type Repository } from 'typeorm'
import typeORMConnection from 'database/typeorm'
import type IInstalacaoRepository from '../interface/IInstalacaoRepository'
import Instalacao from 'modules/instalacao/entities/Instalacao'
import type ICreateInstalacaoDTO from 'modules/instalacao/dtos/ICreateInstalacaoDTO'
import type IFindInstalacaoDTO from 'modules/instalacao/dtos/IFindInstalacaoDTO'
import { type QntItensSalvos } from 'modules/fatura/repository/interfaces/IFaturaRepository'

class InstalacaoRepository implements IInstalacaoRepository {
  private readonly repository: Repository<Instalacao>

  constructor() {
    this.repository = typeORMConnection.getRepository(Instalacao)
  }

  async create({
    numCliente,
    numInstalacao,
  }: ICreateInstalacaoDTO): Promise<Instalacao> {
    const instalacao = this.repository.create({
      id: crypto.randomUUID(),
      numCliente,
      numInstalacao,
    })

    await this.repository.save(instalacao)

    return instalacao
  }

  async find({
    id,
    numInstalacao,
  }: IFindInstalacaoDTO): Promise<Instalacao | null> {
    const instalacao = await this.repository.findOne({
      where: [{ id }, { numInstalacao }],
    })

    return instalacao
  }

  async list(): Promise<[Instalacao[], QntItensSalvos]> {
    const [instalacoes, qntItens] = await this.repository.findAndCount()

    return [instalacoes, qntItens]
  }
}

export default InstalacaoRepository
