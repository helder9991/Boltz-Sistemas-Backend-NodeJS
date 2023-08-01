import { endOfMonth, startOfMonth } from 'date-fns'

interface IResponseLimitesDoMes {
  inicio: Date
  fim: Date
}
export function limitesDoMes(date: Date): IResponseLimitesDoMes {
  const inicio = startOfMonth(date)
  const fim = endOfMonth(date)

  return { inicio, fim }
}
