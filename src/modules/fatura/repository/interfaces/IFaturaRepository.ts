import type IFindFaturaDTO from 'modules/fatura/dtos/IFindFaturaDTO'
import type IListFaturaByInstalacaoDTO from 'modules/fatura/dtos/IListFaturaByInstalacaoDTO'
import type IUploadFaturaDTO from 'modules/fatura/dtos/IUploadFaturaDTO'
import type Fatura from 'modules/fatura/entities/Fatura'

export type QntItensSalvos = number

interface IFaturaRepository {
  upload: (data: IUploadFaturaDTO) => Promise<Fatura>
  find: (data: IFindFaturaDTO) => Promise<Fatura | null>
  listByInstalacao: (
    data: IListFaturaByInstalacaoDTO,
  ) => Promise<[Fatura[], QntItensSalvos]>
}

export default IFaturaRepository
