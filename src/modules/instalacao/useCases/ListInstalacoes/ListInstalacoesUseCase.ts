import { type QntItensSalvos } from 'modules/fatura/repository/interfaces/IFaturaRepository'
import type Instalacao from 'modules/instalacao/entities/Instalacao'
import IInstalacaoRepository from 'modules/instalacao/repository/interface/IInstalacaoRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListInstalacoesUseCase {
  constructor(
    @inject('InstalacaoRepository')
    private readonly instalacaoRepository: IInstalacaoRepository,
  ) {}

  async execute(): Promise<[Instalacao[], QntItensSalvos]> {
    const instalacoes = await this.instalacaoRepository.list()

    return instalacoes
  }
}

export default ListInstalacoesUseCase
