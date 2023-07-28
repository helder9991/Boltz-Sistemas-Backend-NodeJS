import 'reflect-metadata'
import typeORMConnection from 'database/typeorm'
import path from 'path'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import UploadFaturaUseCase from './UploadFaturaUseCase'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'

let uploadFatura: UploadFaturaUseCase
let faturaRepository: FaturaRepository

describe('CreateEmployee', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      uploadFatura = new UploadFaturaUseCase(faturaRepository)

      if (!typeORMConnection.isInitialized) {
        await typeORMConnection.initialize()
        await typeORMConnection.runMigrations()
      }
    } catch (err) {
      console.log(err)
    }
  })

  afterAll(async () => {
    await typeORMConnection.destroy()
  })

  it('Deve ser capaz de dar upload em uma fatura', async () => {
    let filepath = path.join(
      path.resolve(__dirname, '..', '..', '..', '..', 'assets'),
      'test-file1.pdf',
    )

    let fatura = await uploadFatura.execute({ filepath })

    expect(fatura).toMatchObject({
      total: 147.52,
      mesReferencia: new Date('2023-06-01T03:00:00.000Z'),
      mesVencimento: new Date('2023-06-12T03:00:00.000Z'),
      numCliente: 7202788969,
      numInstalacao: 3004298116,
      energiaEletricaUnidade: 'kWh',
      energiaEletricaQuantidade: 100,
      energiaEletricaPrecoUnidade: 0.91380087,
      energiaEletricaValor: 91.36,
      contribIlumPublicaMunicipalValor: 41.19,
      energiaSCEEUnidade: 'kWh',
      energiaSCEEQuantidade: 517,
      energiaSCEEPrecoUnidade: 0.58047642,
      energiaSCEEValor: 300.1,
      energiaCompensadaUnidade: 'kWh',
      energiaCompensadaQuantidade: 517,
      energiaCompensadaPrecoUnidade: 0.55151065,
      energiaCompensadaValor: -285.13,
    })

    expect(fatura).toHaveProperty('filepath')

    filepath = path.join(
      path.resolve(__dirname, '..', '..', '..', '..', 'assets'),
      'test-file2.pdf',
    )

    fatura = await uploadFatura.execute({ filepath })
    expect(fatura).toMatchObject({
      total: 140.04,
      mesReferencia: new Date('2023-01-01T03:00:00.000Z'),
      mesVencimento: new Date('2023-01-06T03:00:00.000Z'),
      numCliente: 7202788969,
      numInstalacao: 3004298116,
      energiaEletricaUnidade: 'kWh',
      energiaEletricaQuantidade: 100,
      energiaEletricaPrecoUnidade: 0.74860466,
      energiaEletricaValor: 74.84,
      contribIlumPublicaMunicipalValor: 35.92,
      energiaInjetadaUnidade: 'kWh',
      energiaInjetadaQuantidade: 954,
      energiaInjetadaPrecoUnidade: 0.65313,
      energiaInjetadaValor: -623.08,
      enCompSemICMSUnidade: 'kWh',
      enCompSemICMSQuantidade: 954,
      enCompSemICMSPrecoUnidade: 0.68383415,
      enCompSemICMSValor: 652.36,
    })

    expect(fatura).toHaveProperty('filepath')
  })
})
