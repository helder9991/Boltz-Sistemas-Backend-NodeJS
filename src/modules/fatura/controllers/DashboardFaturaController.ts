import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import DashboardFaturaUseCase from '../useCases/DashboardFatura/DashboardFaturaUseCase'

class DashboardFaturaController {
  async handle(req: Request, res: Response): Promise<void> {
    const dashboardFaturaUseCase: DashboardFaturaUseCase = container.resolve(
      DashboardFaturaUseCase,
    )

    const dashboard = await dashboardFaturaUseCase.execute()

    res.status(200).json(dashboard)
  }
}

export default new DashboardFaturaController()
