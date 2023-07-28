import type IFaturaRepository from 'modules/fatura/repository/interfaces/IFaturaRepository'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import type IInstalacaoRepository from 'modules/instalacao/repository/interface/IInstalacaoRepository'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import { container } from 'tsyringe'

container.registerSingleton<IFaturaRepository>(
  'FaturaRepository',
  FaturaRepository,
)
container.registerSingleton<IInstalacaoRepository>(
  'InstalacaoRepository',
  InstalacaoRepository,
)
