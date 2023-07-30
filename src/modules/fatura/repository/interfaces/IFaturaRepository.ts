import type IFindFaturaDTO from 'modules/fatura/dtos/IFindFaturaDTO'
import type IListFaturaByInstalacaoDTO from 'modules/fatura/dtos/IListFaturaByInstalacaoDTO'
import type IUploadFaturaDTO from 'modules/fatura/dtos/IUploadFaturaDTO'
import type Fatura from 'modules/fatura/entities/Fatura'

export type QntItensSalvos = number

export interface IDashboard {
  qntUC: number
  totalEnergiaEletrica: number
  totalEnergiaInjetada: number
  totalContribIlumPublicaMunicipal: number
  valorTotal: number
  resumo7meses: Array<{
    mesReferencia: string
    energiaEletricaValor: number
    energiaInjetadaValor: number
    enCompSemICMSValor: number
    contribIlumPublicaMunicipalValor: number
  }>
}

interface IFaturaRepository {
  upload: (data: IUploadFaturaDTO) => Promise<Fatura>
  find: (data: IFindFaturaDTO) => Promise<Fatura | null>
  listByInstalacao: (
    data: IListFaturaByInstalacaoDTO,
  ) => Promise<[Fatura[], QntItensSalvos]>
  dashboard: () => Promise<IDashboard>
}

export default IFaturaRepository
