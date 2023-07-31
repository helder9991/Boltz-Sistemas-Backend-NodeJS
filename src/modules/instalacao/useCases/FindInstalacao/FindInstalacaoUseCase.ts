import type Instalacao from 'modules/instalacao/entities/Instalacao'
import IInstalacaoRepository from 'modules/instalacao/repository/interface/IInstalacaoRepository'
import { inject, injectable } from 'tsyringe'
import AppError from 'utils/AppError'

interface IFindInstalacaoParams {
  numInstalacao: number
}

@injectable()
class FindInstalacaoUseCase {
  constructor(
    @inject('InstalacaoRepository')
    private readonly instalacaoRepository: IInstalacaoRepository,
  ) {}

  async execute({ numInstalacao }: IFindInstalacaoParams): Promise<Instalacao> {
    const instalacaoExiste = await this.instalacaoRepository.find({
      numInstalacao,
    })

    if (instalacaoExiste === null)
      throw new AppError('Esta instalacao nao existe.')

    return instalacaoExiste
  }
}

export default FindInstalacaoUseCase
