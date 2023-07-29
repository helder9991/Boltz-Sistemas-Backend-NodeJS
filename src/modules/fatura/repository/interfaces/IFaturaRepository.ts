import type IFindFaturaDTO from 'modules/fatura/dtos/IFindFaturaDTO'
import type IUploadFaturaDTO from 'modules/fatura/dtos/IUploadFaturaDTO'
import type Fatura from 'modules/fatura/entities/Fatura'

interface IFaturaRepository {
  upload: (data: IUploadFaturaDTO) => Promise<Fatura>
  find: (data: IFindFaturaDTO) => Promise<Fatura | null>
}

export default IFaturaRepository
