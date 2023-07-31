import 'reflect-metadata'
import path from 'path'
import FaturaRepository from 'modules/fatura/repository/typeorm/FaturaRepository'
import InstalacaoRepository from 'modules/instalacao/repository/typeorm/InstalacaoRepository'
import UploadFaturaUseCase from '../UploadFatura/UploadFaturaUseCase'
import DashboardFaturaUseCase from './DashboardFaturaUseCase'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'

let faturaRepository: FaturaRepository
let instalacaoRepository: InstalacaoRepository
let uploadFatura: UploadFaturaUseCase
let dashboardFatura: DashboardFaturaUseCase

const assetsFolder = path.resolve(__dirname, '..', '..', '..', '..', 'assets')

describe('Dashboard Fatura', () => {
  beforeAll(async () => {
    try {
      faturaRepository = new FaturaRepository()
      instalacaoRepository = new InstalacaoRepository()
      uploadFatura = new UploadFaturaUseCase(
        faturaRepository,
        instalacaoRepository,
      )
      dashboardFatura = new DashboardFaturaUseCase(faturaRepository)

      await limpaTabelasNosTestes()

      await uploadFatura.execute({
        filepath: path.join(assetsFolder, 'test-file1.pdf'),
      })
      await uploadFatura.execute({
        filepath: path.join(assetsFolder, 'test-file2.pdf'),
      })
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de exibir o dashboard', async () => {
    const dashboard = await dashboardFatura.execute()

    expect(dashboard).toMatchObject({
      qntUC: 1,
      resumo7meses: [
        {
          mesReferencia: '01/2023',
          energiaEletricaValor: 74.84,
          energiaInjetadaValor: -623.08,
          enCompSemICMSValor: 652.36,
          contribIlumPublicaMunicipalValor: 35.92,
        },
        {
          mesReferencia: '06/2023',
          energiaEletricaValor: 91.36,
          energiaInjetadaValor: null,
          enCompSemICMSValor: null,
          contribIlumPublicaMunicipalValor: 41.19,
        },
      ],
      valorTotal: 287.56,
      totalEnergiaEletrica: 166.2,
      totalEnergiaInjetada: -623.08,
      totalContribIlumPublicaMunicipal: 77.11,
    })
  })
})
