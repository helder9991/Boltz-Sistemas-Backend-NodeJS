import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import * as Yup from 'yup'

import DownloadFaturaUseCase from '../useCases/DownloadFatura/DownloadFaturaUseCase'
import AppError from 'utils/AppError'

class DownloadFaturaController {
  private readonly schema: Yup.ObjectSchema<any>

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
    })
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    if (!(await this.schema.isValid({ id })))
      throw new AppError('Validation Fails', 400)

    const downloadFaturaUseCase: DownloadFaturaUseCase = container.resolve(
      DownloadFaturaUseCase,
    )

    const filepath = await downloadFaturaUseCase.execute({ id })

    res.status(200).download(filepath, 'fatura.pdf')
  }
}

export default new DownloadFaturaController()
