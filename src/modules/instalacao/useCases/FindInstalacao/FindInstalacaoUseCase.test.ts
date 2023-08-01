import 'reflect-metadata'
import FindInstalacaoUseCase from './FindInstalacaoUseCase'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'
import CreateInstalacaoUseCase from '../CreateInstalacao/CreateInstalacaoUseCase'

let createInstalacao: CreateInstalacaoUseCase
let findInstalacao: FindInstalacaoUseCase
let instalacaoRepository: InstalacaoRepository
const instalacaoInfo = {
  numCliente: 1,
  numInstalacao: 987654321,
}

describe('FindInstalacao', () => {
  beforeAll(async () => {
    try {
      instalacaoRepository = new InstalacaoRepository()
      createInstalacao = new CreateInstalacaoUseCase(instalacaoRepository)
      findInstalacao = new FindInstalacaoUseCase(instalacaoRepository)

      await limpaTabelasNosTestes()

      await createInstalacao.execute(instalacaoInfo)
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de encontrar uma Instalacao', async () => {
    const instalacaoInfo = {
      numCliente: 1,
      numInstalacao: 987654321,
    }

    const instalacao = await findInstalacao.execute({
      numInstalacao: instalacaoInfo.numInstalacao,
    })

    expect(instalacao).toMatchObject(instalacaoInfo)
  })

  it('Não deve ser capaz de encontrar uma instalacao que nao existe', async () => {
    await expect(
      findInstalacao.execute({ numInstalacao: 0 }),
    ).rejects.toHaveProperty('message', 'Esta instalacao nao existe.')
  })
})
