import request from 'supertest'
import path from 'path'
import app from '../../app'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import UploadFaturaUseCase from 'modules/fatura/useCases/UploadFatura/UploadFaturaUseCase'
import type Fatura from 'modules/fatura/entities/Fatura'

let faturaRepository: FaturaRepository
let uploadFatura: UploadFaturaUseCase
let instalacaoRepository: InstalacaoRepository
let fatura: Fatura

describe('Show Faturas E2E', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      instalacaoRepository = new InstalacaoRepository()
      uploadFatura = new UploadFaturaUseCase(
        faturaRepository,
        instalacaoRepository,
      )

      await limpaTabelasNosTestes()

      const assetsFolder = path.resolve(__dirname, '..', '..', 'assets')
      // Cadastra faturas
      const filepath = path.join(assetsFolder, 'test-file1.pdf')
      fatura = await uploadFatura.execute({ filepath })
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de mostrar uma fatura a partir do seu id', async () => {
    const response = await request(app).get(`/fatura/historico/${fatura.id}`)

    const body: Fatura = response.body as Fatura

    expect(response.status).toBe(200)
    expect(body.id).toBe(fatura.id)
  })

  it('Nao deve ser capaz de mostrar uma fatura que nao existe', async () => {
    let response = await request(app).get(
      '/fatura/historico/idInstalacaoErrado',
    )

    expect(response.status).toBe(400)
    expect(response.body.mensagem).toBe('Validation Fails')

    const idInexistente = '8de09cac-9fd2-4a3a-a3ca-622f09c3f942'
    response = await request(app).get(`/fatura/historico/${idInexistente}`)

    expect(response.status).toBe(400)
    expect(response.body.mensagem).toBe('Esta fatura nao existe')
  })
})
