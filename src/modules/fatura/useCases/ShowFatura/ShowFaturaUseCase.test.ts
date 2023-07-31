import 'reflect-metadata'
import path from 'path'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import ShowFaturaUseCase from './ShowFaturaUseCase'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import UploadFaturaUseCase, {
  type IUploadFaturaResponse,
} from '../UploadFatura/UploadFaturaUseCase'
import Fatura from 'modules/fatura/entities/Fatura'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'

let faturaRepository: FaturaRepository
let instalacaoRepository: InstalacaoRepository
let uploadFatura: UploadFaturaUseCase
let showFatura: ShowFaturaUseCase

let fatura: IUploadFaturaResponse

describe('Show Fatura', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      instalacaoRepository = new InstalacaoRepository()
      uploadFatura = new UploadFaturaUseCase(
        faturaRepository,
        instalacaoRepository,
      )
      showFatura = new ShowFaturaUseCase(faturaRepository)

      await limpaTabelasNosTestes()

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
    const faturaExists = await showFatura.execute({
      id: fatura.id,
    })

    expect(faturaExists).toBeInstanceOf(Fatura)
  })

  it('Nao deve ser capaz de encontrar uma fatura que nao existe', async () => {
    await expect(
      showFatura.execute({
        id: '813c72b5-d5a9-4c6b-b999-7b53dcee7a82',
      }),
    ).rejects.toHaveProperty('message', 'Esta fatura nao existe')
  })
})
