import typeORMConnection from 'database/typeorm'
import Fatura from 'modules/fatura/entities/Fatura'
import Instalacao from 'modules/instalacao/entities/Instalacao'
import AppError from './AppError'

async function limpaTabelasNosTestes(): Promise<void> {
  if (process.env.NODE_ENV !== 'test')
    throw new AppError(
      'Está função so deve ser rodada em ambiente de testes',
      500,
    )

  if (!typeORMConnection.isInitialized) await typeORMConnection.initialize()
  typeORMConnection.getRepository(Fatura).delete({})
  typeORMConnection.getRepository(Instalacao).delete({})
}

export default limpaTabelasNosTestes
