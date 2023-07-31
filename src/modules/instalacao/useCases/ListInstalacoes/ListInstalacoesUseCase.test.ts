import 'reflect-metadata'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'
import CreateInstalacaoUseCase from '../CreateInstalacao/CreateInstalacaoUseCase'
import ListInstalacoesUseCase from './ListInstalacoesUseCase'

let createInstalacao: CreateInstalacaoUseCase
let listInstalacoes: ListInstalacoesUseCase
let instalacaoRepository: InstalacaoRepository

describe('List Instalacoes', () => {
  beforeAll(async () => {
    try {
      instalacaoRepository = new InstalacaoRepository()
      createInstalacao = new CreateInstalacaoUseCase(instalacaoRepository)
      listInstalacoes = new ListInstalacoesUseCase(instalacaoRepository)

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
    const instalacoes = await listInstalacoes.execute()

    expect(instalacoes).toHaveLength(2)
  })
})
