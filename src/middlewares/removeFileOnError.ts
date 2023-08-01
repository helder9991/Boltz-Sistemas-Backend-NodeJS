import { type Request, type Response, type NextFunction } from 'express'
import fs from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(fs.unlink)

async function removeFileOnError(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      const filePath = req.file?.path
      if (filePath !== undefined) {
        unlinkAsync(filePath)
          .then(() => {
            console.log('Arquivo removido após erro na requisição.')
          })
          .catch((err) => {
            console.error('Erro ao remover arquivo:', err)
          })
      }
    }
  })

  next()
}

export default removeFileOnError
