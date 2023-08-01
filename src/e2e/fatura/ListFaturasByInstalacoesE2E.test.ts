import request from 'supertest'
import path from 'path'
import app from '../../app'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import FindInstalacaoUseCase from 'modules/instalacao/useCases/FindInstalacao/FindInstalacaoUseCase'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import UploadFaturaUseCase from 'modules/fatura/useCases/UploadFatura/UploadFaturaUseCase'
import { type IListByInstalacaoControllerResponse } from 'modules/fatura/controllers/ListFaturasByInstalacaoController'
import type Fatura from 'modules/fatura/entities/Fatura'

let findInstalacao: FindInstalacaoUseCase
let faturaRepository: FaturaRepository
let uploadFatura: UploadFaturaUseCase
let instalacaoRepository: InstalacaoRepository
let idInstalacao: string

describe('List Faturas By Instalacoes E2E', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      instalacaoRepository = new InstalacaoRepository()
      uploadFatura = new UploadFaturaUseCase(
        faturaRepository,
        instalacaoRepository,
      )
      findInstalacao = new FindInstalacaoUseCase(instalacaoRepository)

      await limpaTabelasNosTestes()
      const assetsFolder = path.resolve(__dirname, '..', '..', 'assets')
      // Cadastra faturas
      let filepath = path.join(assetsFolder, 'test-file1.pdf')

      const response1 = await uploadFatura.execute({ filepath })

      filepath = path.join(assetsFolder, 'test-file2.pdf')

      await uploadFatura.execute({ filepath })

      // Pega o id da instalacao das faturas cadastradas

      const instalacao = await findInstalacao.execute({
        numInstalacao: response1.numInstalacao,
      })

      idInstalacao = instalacao.id
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de listar as faturas a partir de um idInstalacao', async () => {
    let response = await request(app)
      .get('/fatura/historico')
      .query({ idInstalacao })

    let body: IListByInstalacaoControllerResponse =
      response.body as IListByInstalacaoControllerResponse

    expect(response.status).toBe(200)
    body.faturas.forEach((fatura: Fatura) => {
      expect(fatura).toHaveProperty('id')
    })
    expect(body.qntItens).toBe(2)

    response = await request(app)
      .get('/fatura/historico')
      .query({ pagina: 1, idInstalacao })
    body = response.body as IListByInstalacaoControllerResponse

    expect(response.status).toBe(200)
    body.faturas.forEach((fatura: Fatura) => {
      expect(fatura).toHaveProperty('id')
    })
    expect(body.qntItens).toBe(2)
  })

  it('Deve ser capaz de filtrar as faturas a partir do mes', async () => {
    const response = await request(app)
      .get('/fatura/historico')
      .query({ idInstalacao, data: '06/01/2023' })

    const body: IListByInstalacaoControllerResponse =
      response.body as IListByInstalacaoControllerResponse

    expect(response.status).toBe(200)
    body.faturas.forEach((fatura: Fatura) => {
      expect(fatura).toHaveProperty('id')
    })
    expect(body.qntItens).toBe(1)
  })

  it('Nao deve ser capaz de listar as faturas a partir de um idInstalacao nao existente', async () => {
    let response = await request(app)
      .get('/fatura/historico')
      .query({ idInstalacao: 'idInstalacaoErrado' })

    expect(response.status).toBe(400)
    expect(response.body.mensagem).toBe('Validation Fails')

    // Testa com uuid que não existe para passar na validacao
    const idInstalacaoErrado = '8de09cac-9fd2-4a3a-a3ca-622f09c3f942'
    response = await request(app)
      .get('/fatura/historico')
      .query({ pagina: 1, idInstalacao: idInstalacaoErrado })

    expect(response.status).toBe(400)
    expect(response.body.mensagem).toBe('Esta instalacao nao existe.')
  })
})
