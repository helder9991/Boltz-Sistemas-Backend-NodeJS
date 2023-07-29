import request from 'supertest'
import path from 'path'
import app from '../../app'
import { type IUploadFaturaResponse } from 'modules/fatura/useCases/UploadFatura/UploadFaturaUseCase'
import limpaTabelasNosTestes from 'utils/limpaTabelasNosTestes'

const filepath = path.join(
  path.resolve(__dirname, '..', '..', 'assets'),
  'test-file1.pdf',
)

let idFatura: string

describe('Download Fatura E2E', () => {
  beforeAll(async () => {
    try {
      await limpaTabelasNosTestes()

      const { body }: { body: IUploadFaturaResponse } = await request(app)
        .post('/fatura/upload')
        .attach('file', filepath)

      idFatura = body.id
    } catch (err) {
      console.error(err)
    }
  })

  it('Deve ser capaz de fazer o download do arquivo com o ID fornecido na URL', async () => {
    const response = await request(app).get(`/fatura/download/${idFatura}`)

    expect(response.status).toBe(200)
    expect(response.header['content-disposition']).toMatch(/^attachment;/i)
    expect(response.header['content-type']).toMatch(/^application\/pdf/i)
  })

  it('Nao deve ser capaz de fazer o download do arquivo se nao for fornecido um ID valido', async () => {
    const response = await request(app).get(
      `/fatura/download/${'id-nao-existente'}`,
    )

    expect(response.status).toBe(400)
    expect(response.body.mensagem).toBe('Validation Fails')
  })
})
