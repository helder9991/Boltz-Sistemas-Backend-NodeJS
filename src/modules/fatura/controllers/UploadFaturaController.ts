import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import UploadFaturaUseCase from '../useCases/UploadFatura/UploadFaturaUseCase'
import AppError from 'utils/AppError'

class UploadFaturaController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req

    if (file == null) throw new AppError('Validation Fails', 400)

    const uploadFaturaUseCase: UploadFaturaUseCase =
      container.resolve(UploadFaturaUseCase)

    const filepath = file.path
    await uploadFaturaUseCase.execute({ filepath })

    return res.status(201).send()
  }
}

export default new UploadFaturaController()
