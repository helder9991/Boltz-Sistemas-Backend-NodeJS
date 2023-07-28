import typeORMConnection from 'database/typeorm'
import fs from 'fs'
import path from 'path'

const dbFilePath = path.join(
  path.resolve(__dirname, '..', 'src', 'database'),
  'db.sqlite',
)

export default async (): Promise<void> => {
  try {
    await typeORMConnection.destroy()

    // Verifica se o arquivo db.sqlite existe antes de tentar removê-lo
    if (fs.existsSync(dbFilePath)) {
      fs.unlinkSync(dbFilePath)
      console.log('Arquivo db.sqlite removido com sucesso!')
    }
  } catch (error) {
    console.error('Erro ao remover o arquivo db.sqlite:', error)
  }
}
