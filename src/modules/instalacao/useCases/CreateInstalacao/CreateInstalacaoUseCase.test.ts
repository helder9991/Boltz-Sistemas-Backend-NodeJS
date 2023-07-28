import 'reflect-metadata'
import typeORMConnection from 'database/typeorm'
import CreateInstalacaoUseCase from './CreateInstalacaoUseCase'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'

let createInstalacao: CreateInstalacaoUseCase
let instalacaoRepository: InstalacaoRepository

describe('CreateInstalacao', () => {
  beforeAll(async () => {
    try {
      instalacaoRepository = new InstalacaoRepository()
      createInstalacao = new CreateInstalacaoUseCase(instalacaoRepository)

      if (!typeORMConnection.isInitialized) await typeORMConnection.initialize()
    } catch (err) {
      console.error(err)
    }
  })

  afterAll(async () => {
    await typeORMConnection.destroy()
  })

  it('Deve ser capaz de criar uma Instalacao', async () => {
    const instalacaoInfo = {
      numCliente: 1,
      numInstalacao: 987654321,
    }

    const instalacao = await createInstalacao.execute(instalacaoInfo)

    expect(instalacao).toMatchObject(instalacaoInfo)
  })

  it('Não deve ser capaz de criar uma instalacao se ela ja existe', async () => {
    const instalacaoInfo = {
      numCliente: 2,
      numInstalacao: 1,
    }

    await createInstalacao.execute(instalacaoInfo)

    expect(createInstalacao.execute(instalacaoInfo)).rejects.toHaveProperty(
      'message',
      'Esta instalacao ja existe.',
    )
  })
})
