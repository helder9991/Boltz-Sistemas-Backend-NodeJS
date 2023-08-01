import { type Request, type Response } from 'express'
import * as Yup from 'yup'
import { container } from 'tsyringe'
import AppError from 'utils/AppError'
import ListFaturasByInstalacaoUseCase from '../useCases/ListFaturasByInstalacao/ListFaturasByInstalacaoUseCase'
import type Fatura from '../entities/Fatura'
import { type ParsedQs } from 'qs'

export interface IListByInstalacaoControllerResponse {
  faturas: Fatura[]
  qntItens: number
}

interface IQueryRequest extends ParsedQs {
  idInstalacao: string
  pagina?: string
  data?: string
}

class ListFaturasByInstalacaoController {
  private readonly schema

  constructor() {
    this.schema = Yup.object().shape({
      idInstalacao: Yup.string().uuid().required(),
      pagina: Yup.number().positive(),
      data: Yup.date(),
    })
  }

  async handle(
    req: Request,
    res: Response,
  ): Promise<Response<IListByInstalacaoControllerResponse>> {
    const { idInstalacao, pagina, data } = req.query as IQueryRequest

    if (!(await this.schema.isValid({ idInstalacao, pagina, data })))
      throw new AppError('Validation Fails', 400)

    const listFaturasByInstalacaoUseCase: ListFaturasByInstalacaoUseCase =
      container.resolve(ListFaturasByInstalacaoUseCase)

    const [faturas, qntItens] = await listFaturasByInstalacaoUseCase.execute({
      idInstalacao,
      pagina: pagina !== undefined ? Number(pagina) : undefined,
      data: data !== undefined ? new Date(data) : undefined,
    })

    return res.status(200).json({ faturas, qntItens })
  }
}

export default new ListFaturasByInstalacaoController()
