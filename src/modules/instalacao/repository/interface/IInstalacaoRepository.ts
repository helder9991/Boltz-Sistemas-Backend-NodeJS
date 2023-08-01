import { type QntItensSalvos } from 'modules/fatura/repository/interfaces/IFaturaRepository'
import type ICreateInstalacaoDTO from 'modules/instalacao/dtos/ICreateInstalacaoDTO'
import type IFindInstalacaoDTO from 'modules/instalacao/dtos/IFindInstalacaoDTO'
import type Instalacao from 'modules/instalacao/entities/Instalacao'

interface IInstalacaoRepository {
  create: (data: ICreateInstalacaoDTO) => Promise<Instalacao>
  find: (data: IFindInstalacaoDTO) => Promise<Instalacao | null>
  list: () => Promise<[Instalacao[], QntItensSalvos]>
}

export default IInstalacaoRepository
