import type IUploadFaturaDTO from 'modules/fatura/dtos/UploadFaturaDTO'
import type Fatura from 'modules/fatura/entities/Fatura'

interface IFaturaRepository {
  upload: (data: IUploadFaturaDTO) => Promise<Fatura>
}

export default IFaturaRepository
