import type Instalacao from 'modules/instalacao/entities/Instalacao'
import IInstalacaoRepository from 'modules/instalacao/repository/interface/IInstalacaoRepository'
import { inject, injectable } from 'tsyringe'
import AppError from 'utils/AppError'

interface ICreateInstalacaoParams {
  numCliente: number
  numInstalacao: number
}

@injectable()
class CreateInstalacaoUseCase {
  constructor(
    @inject('InstalacaoRepository')
    private readonly instalacaoRepository: IInstalacaoRepository,
  ) {}

  async execute({
    numCliente,
    numInstalacao,
  }: ICreateInstalacaoParams): Promise<Instalacao> {
    const instalacaoExiste = await this.instalacaoRepository.find({
      numInstalacao,
    })

    if (instalacaoExiste != null)
      throw new AppError('Esta instalacao ja existe.')

    const instalacao = await this.instalacaoRepository.create({
      numCliente,
      numInstalacao,
    })

    return instalacao
  }
}

export default CreateInstalacaoUseCase
