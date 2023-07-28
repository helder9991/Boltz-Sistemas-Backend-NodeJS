import type IUploadFaturaDTO from 'modules/fatura/dtos/UploadFaturaDTO'

interface IFaturaRepository {
  upload: (data: IUploadFaturaDTO) => Promise<void>
}

export default IFaturaRepository
