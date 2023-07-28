import { Router } from 'express'
import faturaRoutes from './fatura.routes'

const routes = Router()

routes.use('/fatura', faturaRoutes)

export default routes
