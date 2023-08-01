import { type Request, type Response } from 'express'

import { container } from 'tsyringe'
import type Instalacao from '../entities/Instalacao'
import ListInstalacoesUseCase from '../useCases/ListInstalacoes/ListInstalacoesUseCase'

export interface IListInstalacoesControllerResponse {
  instalacoes: Instalacao[]
  qntItens: number
}

class ListInstalacoesController {
  async handle(
    req: Request,
    res: Response,
  ): Promise<Response<IListInstalacoesControllerResponse>> {
    const listInstalacoesUseCase: ListInstalacoesUseCase = container.resolve(
      ListInstalacoesUseCase,
    )

    const [instalacoes, qntItens] = await listInstalacoesUseCase.execute()

    return res.status(200).json({ instalacoes, qntItens })
  }
}

export default new ListInstalacoesController()
