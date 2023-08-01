import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import UploadFaturaUseCase, {
  type IUploadFaturaResponse,
} from '../useCases/UploadFatura/UploadFaturaUseCase'
import AppError from 'utils/AppError'

class UploadFaturaController {
  async handle(
    req: Request,
    res: Response,
  ): Promise<Response<IUploadFaturaResponse>> {
    const { file } = req

    if (file == null) throw new AppError('Validation Fails', 400)

    const uploadFaturaUseCase: UploadFaturaUseCase =
      container.resolve(UploadFaturaUseCase)

    const filepath = file.path
    const fatura = await uploadFaturaUseCase.execute({ filepath })

    return res.status(201).json(fatura)
  }
}

export default new UploadFaturaController()
