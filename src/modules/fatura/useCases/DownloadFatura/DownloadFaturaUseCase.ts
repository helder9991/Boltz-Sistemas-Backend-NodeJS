import IFaturaRepository from 'modules/fatura/repository/interfaces/IFaturaRepository'
import { inject, injectable } from 'tsyringe'
import AppError from 'utils/AppError'

interface IDownloadFaturaParams {
  id: string
}

@injectable()
class DownloadFaturaUseCase {
  constructor(
    @inject('FaturaRepository')
    private readonly faturaRepository: IFaturaRepository,
  ) {}

  async execute({ id }: IDownloadFaturaParams): Promise<string> {
    const fatura = await this.faturaRepository.find({ id })

    if (fatura === null) throw new AppError('Esta fatura nao existe')

    return fatura.filepath
  }
}

export default DownloadFaturaUseCase
