import { type Request, type Response } from 'express'
import * as Yup from 'yup'
import { container } from 'tsyringe'
import AppError from 'utils/AppError'
import type Fatura from '../entities/Fatura'
import { type ParamsDictionary } from 'express-serve-static-core'
import ShowFaturaUseCase from '../useCases/ShowFatura/ShowFaturaUseCase'

interface IParamsRequest extends ParamsDictionary {
  id: string
}

class ShowFaturaController {
  private readonly schema

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
    })
  }

  async handle(req: Request, res: Response): Promise<Response<Fatura>> {
    const { id } = req.params as IParamsRequest

    if (!(await this.schema.isValid({ id })))
      throw new AppError('Validation Fails', 400)

    const showFaturaUseCase: ShowFaturaUseCase =
      container.resolve(ShowFaturaUseCase)

    const fatura = await showFaturaUseCase.execute({
      id,
    })

    const { filepath, ...faturaSemFilepath } = fatura

    return res.status(200).json(faturaSemFilepath)
  }
}

export default new ShowFaturaController()
