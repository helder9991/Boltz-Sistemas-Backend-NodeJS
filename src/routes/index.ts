import { Router } from 'express'
import faturaRoutes from './fatura.routes'
import instalacaoRoutes from './instalacao.routes'

const routes = Router()

routes.use('/fatura', faturaRoutes)
routes.use('/instalacao', instalacaoRoutes)

export default routes
