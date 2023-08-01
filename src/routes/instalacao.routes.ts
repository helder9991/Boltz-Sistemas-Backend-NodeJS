import { type Request, type Response, Router } from 'express'
import ListInstalacoesController from 'modules/instalacao/controllers/ListInstalacoesController'

const instalacaoRoutes = Router()

instalacaoRoutes.get('/', (req: Request, res: Response) =>
  ListInstalacoesController.handle(req, res),
)

export default instalacaoRoutes
