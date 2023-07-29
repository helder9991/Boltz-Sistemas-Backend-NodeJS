import 'reflect-metadata'
import typeORMConnection from 'database/typeorm'
import path from 'path'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import UploadFaturaUseCase, {
  type IUploadFaturaResponse,
} from '../UploadFatura/UploadFaturaUseCase'
import DownloadFaturaUseCase from './DownloadFaturaUseCase'
import Fatura from 'modules/fatura/entities/Fatura'

let faturaRepository: FaturaRepository
let instalacaoRepository: InstalacaoRepository
let uploadFatura: UploadFaturaUseCase
let downloadFatura: DownloadFaturaUseCase

let fatura: IUploadFaturaResponse

const filepath = path.join(
  path.resolve(__dirname, '..', '..', '..', '..', 'assets'),
  'test-file1.pdf',
)

describe('DownloadFatura', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      instalacaoRepository = new InstalacaoRepository()
      uploadFatura = new UploadFaturaUseCase(
        faturaRepository,
        instalacaoRepository,
      )
      downloadFatura = new DownloadFaturaUseCase(faturaRepository)

      if (!typeORMConnection.isInitialized) await typeORMConnection.initialize()

      await typeORMConnection.getRepository(Fatura).delete({})
      fatura = await uploadFatura.execute({ filepath })
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de exibir o caminho do arquivo para o download', async () => {
    const faturaFilepath = await downloadFatura.execute({ id: fatura.id })

    expect(faturaFilepath).toBe(filepath)
  })

  it('Nao deve ser capaz de exibir o caminho do arquivo que nao existe', async () => {
    await expect(
      downloadFatura.execute({ id: 'non-existing' }),
    ).rejects.toHaveProperty('message', 'Esta fatura nao existe')
  })
})
