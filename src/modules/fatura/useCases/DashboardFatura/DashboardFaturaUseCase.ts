import IFaturaRepository, {
  type IDashboard,
} from 'modules/fatura/repository/interfaces/IFaturaRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class DashboardFaturaUseCase {
  constructor(
    @inject('FaturaRepository')
    private readonly faturaRepository: IFaturaRepository,
  ) {}

  async execute(): Promise<IDashboard> {
    const dashboard = await this.faturaRepository.dashboard()

    return dashboard
  }
}

export default DashboardFaturaUseCase
