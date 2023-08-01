import request from 'supertest'
import app from '../../app'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'
import CreateInstalacaoUseCase from 'modules/instalacao/useCases/CreateInstalacao/CreateInstalacaoUseCase'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import { type IListInstalacoesControllerResponse } from 'modules/instalacao/controllers/ListInstalacoesController'

let createInstalacao: CreateInstalacaoUseCase
let instalacaoRepository: InstalacaoRepository

describe('List Instalacoes E2E', () => {
  beforeAll(async () => {
    try {
      instalacaoRepository = new InstalacaoRepository()
      createInstalacao = new CreateInstalacaoUseCase(instalacaoRepository)

      await limpaTabelasNosTestes()

      await createInstalacao.execute({
        numCliente: 10,
        numInstalacao: 10,
      })
      await createInstalacao.execute({
        numCliente: 10,
        numInstalacao: 20,
      })
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de listar as Instalacoes', async () => {
    const response = await request(app).get('/instalacao')

    const body: IListInstalacoesControllerResponse =
      response.body as IListInstalacoesControllerResponse

    expect(response.status).toBe(200)

    expect(body.qntItens).toBe(2)
  })
})
