import request from 'supertest'
import path from 'path'
import app from '../../app'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'

const filepath = path.join(
  path.resolve(__dirname, '..', '..', 'assets'),
  'test-file1.pdf',
)

describe('Upload Fatura E2E', () => {
  beforeAll(async () => {
    try {
      await limpaTabelasNosTestes()
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de fazer o upload da fatura', async () => {
    const response = await request(app)
      .post('/fatura/upload')
      .attach('file', filepath)

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      total: 147.52,
      mesReferencia: '2023-06-01T03:00:00.000Z',
      mesVencimento: '2023-06-12T03:00:00.000Z',
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
  })

  it('Nao deve ser capaz de fazer o upload da fatura sem o arquivo', async () => {
    const response = await request(app).post('/fatura/upload')

    expect(response.status).toBe(400)
    expect(response.body.mensagem).toBe('Validation Fails')
  })
})
