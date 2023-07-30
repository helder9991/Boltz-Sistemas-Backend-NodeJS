import upload from 'configs/multer'
import { type Request, type Response, Router } from 'express'
import removeFileOnError from 'middlewares/removeFileOnError'
import DashboardFaturaController from 'modules/fatura/controllers/DashboardFaturaController'
import DownloadFaturaController from 'modules/fatura/controllers/DownloadFaturaController'
import ListFaturasByInstalacaoController from 'modules/fatura/controllers/ListFaturasByInstalacaoController'
import ShowFaturaController from 'modules/fatura/controllers/ShowFaturaController'
import UploadFaturaController from 'modules/fatura/controllers/UploadFaturaController'

const faturaRoutes = Router()

faturaRoutes.post(
  '/upload',
  upload.single('file'),
  removeFileOnError,
  (req: Request, res: Response) => UploadFaturaController.handle(req, res),
)

faturaRoutes.get('/download/:id', (req: Request, res: Response) =>
  DownloadFaturaController.handle(req, res),
)

faturaRoutes.get('/historico', (req: Request, res: Response) =>
  ListFaturasByInstalacaoController.handle(req, res),
)

faturaRoutes.get('/historico/:id', (req: Request, res: Response) =>
  ShowFaturaController.handle(req, res),
)

faturaRoutes.get('/dashboard', (req: Request, res: Response) =>
  DashboardFaturaController.handle(req, res),
)

export default faturaRoutes
