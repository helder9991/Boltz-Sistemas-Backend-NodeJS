import upload from 'configs/multer'
import { type Request, type Response, Router } from 'express'
import removeFileOnError from 'middlewares/removeFileOnError'
import UploadFaturaController from 'modules/fatura/controllers/UploadFaturaController'

const faturaRoutes = Router()

faturaRoutes.post(
  '/upload',
  upload.single('file'),
  removeFileOnError,
  (req: Request, res: Response) => UploadFaturaController.handle(req, res),
)

export default faturaRoutes
