import type IFaturaRepository from 'modules/fatura/repository/interfaces/IFaturaRepository'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import { container } from 'tsyringe'

container.registerSingleton<IFaturaRepository>('FaturaRepository', FaturaRepository)
