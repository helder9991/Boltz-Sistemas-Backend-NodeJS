import { inject, injectable } from 'tsyringe'
import IFaturaRepository, {
  type QntItensSalvos,
} from 'modules/fatura/repository/interfaces/IFaturaRepository'
import type Fatura from 'modules/fatura/entities/Fatura'
import AppError from 'utils/AppError'

interface IListFaturaByInstalacaoParams {
  idInstalacao: string
  pagina?: number
  data?: Date
}

@injectable()
class ListFaturasByInstalacaoUseCase {
  constructor(
    @inject('FaturaRepository')
    private readonly faturaRepository: IFaturaRepository,
  ) {}

  async execute({
    idInstalacao,
    pagina,
    data,
  }: IListFaturaByInstalacaoParams): Promise<[Fatura[], QntItensSalvos]> {
    const instalacaoExiste = await this.faturaRepository.find({
      idInstalacao,
    })

    if (instalacaoExiste === null)
      throw new AppError('Esta instalacao nao existe.')

    const faturas = await this.faturaRepository.listByInstalacao({
      idInstalacao,
      pagina,
      data,
    })

    return faturas
  }
}

export default ListFaturasByInstalacaoUseCase
