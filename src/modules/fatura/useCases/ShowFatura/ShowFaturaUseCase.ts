import type Fatura from 'modules/fatura/entities/Fatura'
import IFaturaRepository from 'modules/fatura/repository/interfaces/IFaturaRepository'
import { inject, injectable } from 'tsyringe'
import AppError from 'utils/AppError'

interface IShowFaturaParams {
  id: string
}

@injectable()
class ShowFaturaUseCase {
  constructor(
    @inject('FaturaRepository')
    private readonly faturaRepository: IFaturaRepository,
  ) {}

  async execute({ id }: IShowFaturaParams): Promise<Fatura> {
    const fatura = await this.faturaRepository.find({
      id,
    })

    if (fatura === null) throw new AppError('Esta fatura nao existe')

    return fatura
  }
}

export default ShowFaturaUseCase
