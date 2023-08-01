import { type Request } from 'express'
import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

// Configuração do armazenamento dos arquivos com o Multer
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', 'assets'),
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Gerando um uniqueSuffix usando crypto.randomUUID()
    const uniqueSuffix: string = crypto.randomUUID()

    // Verificando se o arquivo é um PDF
    if (file.mimetype === 'application/pdf') {
      // Usando template string para criar o nome do arquivo
      const filename = `${uniqueSuffix}-${Date.now()}.pdf`
      cb(null, filename)
    } else {
      cb(new Error('Apenas arquivos PDF são permitidos!'), '')
    }
  },
})

const upload = multer({ storage })

export default upload
