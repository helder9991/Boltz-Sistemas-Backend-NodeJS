import typeORMConnection from 'database/typeorm'
import { type NextFunction, type Request, type Response } from 'express'

async function initializeDatabaseConnection(
  _req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  if (!typeORMConnection.isInitialized) await typeORMConnection.initialize()

  next()
}

export default initializeDatabaseConnection
