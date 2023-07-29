import 'reflect-metadata'
import typeORMConnection from 'database/typeorm'
import path from 'path'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import FindFaturaUseCase from './FindFaturaUseCase'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import UploadFaturaUseCase, {
  type IUploadFaturaResponse,
} from '../UploadFatura/UploadFaturaUseCase'
import Fatura from 'modules/fatura/entities/Fatura'

let faturaRepository: FaturaRepository
let instalacaoRepository: InstalacaoRepository
let uploadFatura: UploadFaturaUseCase
let findFatura: FindFaturaUseCase

let fatura: IUploadFaturaResponse

describe('FindFatura', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      instalacaoRepository = new InstalacaoRepository()
      findFatura = new FindFaturaUseCase(faturaRepository, instalacaoRepository)
      uploadFatura = new UploadFaturaUseCase(
        faturaRepository,
        instalacaoRepository,
      )

      if (!typeORMConnection.isInitialized) await typeORMConnection.initialize()

      const filepath = path.join(
        path.resolve(__dirname, '..', '..', '..', '..', 'assets'),
        'test-file1.pdf',
      )

      fatura = await uploadFatura.execute({ filepath })
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de encontrar uma fatura', async () => {
    const faturaExists = await findFatura.execute({
      numInstalacao: fatura.numInstalacao,
      mesReferencia: fatura.mesReferencia,
    })

    expect(faturaExists).toBeInstanceOf(Fatura)
  })

  it('Nao deve ser capaz de encontrar uma fatura se a instalacao nao existe', async () => {
    expect(
      findFatura.execute({ mesReferencia: new Date(), numInstalacao: 123 }),
    ).rejects.toHaveProperty('message', 'Esta instalacao nao existe')
  })

  it('Nao deve ser capaz de encontrar uma fatura que nao existe', async () => {
    await expect(
      findFatura.execute({
        mesReferencia: new Date(),
        numInstalacao: fatura.numInstalacao,
      }),
    ).rejects.toHaveProperty('message', 'Esta fatura nao existe')
  })
})
