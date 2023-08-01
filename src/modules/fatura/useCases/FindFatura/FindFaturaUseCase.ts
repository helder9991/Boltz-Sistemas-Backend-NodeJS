import type Fatura from 'modules/fatura/entities/Fatura'
import IFaturaRepository from 'modules/fatura/repository/interfaces/IFaturaRepository'
import IInstalacaoRepository from 'modules/instalacao/repository/interface/IInstalacaoRepository'
import { inject, injectable } from 'tsyringe'
import AppError from 'utils/AppError'

interface IFindFaturaParams {
  numInstalacao: number
  mesReferencia: Date
}

@injectable()
class FindFaturaUseCase {
  constructor(
    @inject('FaturaRepository')
    private readonly faturaRepository: IFaturaRepository,
    @inject('InstalacaoRepository')
    private readonly instalacaoRepository: IInstalacaoRepository,
  ) {}

  async execute({
    numInstalacao,
    mesReferencia,
  }: IFindFaturaParams): Promise<Fatura> {
    const instalacaoExiste = await this.instalacaoRepository.find({
      numInstalacao,
    })

    if (instalacaoExiste === null)
      throw new AppError('Esta instalacao nao existe')

    const fatura = await this.faturaRepository.find({
      idInstalacao: instalacaoExiste.id,
      mesReferencia,
    })

    if (fatura === null) throw new AppError('Esta fatura nao existe')

    return fatura
  }
}

export default FindFaturaUseCase
