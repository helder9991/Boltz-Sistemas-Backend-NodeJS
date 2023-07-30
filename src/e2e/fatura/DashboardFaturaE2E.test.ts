import request from 'supertest'
import path from 'path'
import app from '../../app'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'

const assetsFolder = path.resolve(__dirname, '..', '..', 'assets')

describe('Dashboard Fatura E2E', () => {
  beforeAll(async () => {
    try {
      await limpaTabelasNosTestes()

      let filepath = path.join(assetsFolder, 'test-file1.pdf')
      await request(app).post('/fatura/upload').attach('file', filepath)

      filepath = path.join(assetsFolder, 'test-file2.pdf')
      await request(app).post('/fatura/upload').attach('file', filepath)
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de mostrar as infomações do dashboard', async () => {
    const response = await request(app).get(`/fatura/dashboard`)

    expect(response.body).toMatchObject({
      qntUC: 1,
      resumo7meses: [
        {
          contribIlumPublicaMunicipalValor: 35.92,
          enCompSemICMSValor: 652.36,
          energiaEletricaValor: 74.84,
          energiaInjetadaValor: -623.08,
          mesReferencia: '01/2023',
        },
        {
          contribIlumPublicaMunicipalValor: 41.19,
          enCompSemICMSValor: null,
          energiaEletricaValor: 91.36,
          energiaInjetadaValor: null,
          mesReferencia: '06/2023',
        },
      ],
    })
    expect(response.status).toBe(200)
  })
})
