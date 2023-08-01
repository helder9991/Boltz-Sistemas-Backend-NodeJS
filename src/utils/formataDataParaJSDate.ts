import AppError from './AppError'

const formataDataParaJSDate = (data: string): Date => {
  // Mapeia os nomes abreviados dos meses para os meses numéricos
  const nomeMeses = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ]

  // Caso receba JUN/2023
  if (data.split('/').length === 2) {
    // Divide a string da data em partes
    const [mes, ano] = data.split('/')

    // Obtém o índice do mês no array monthNames (subtraindo 1 pois o índice começa em 0)
    const monthIndex = nomeMeses.findIndex((nomeMes) => nomeMes === mes) + 1

    // Cria o objeto Date com o mês e ano obtidos
    const jsDate = new Date(`${ano}-${monthIndex}`)

    return jsDate
  }

  // Caso receba 12/07/2023
  if (data.split('/').length === 3) {
    // Dividir a string em dia, mês e ano
    const [day, month, year] = data.split('/')

    // O construtor Date aceita o formato ano-mês-dia
    // Porém, os meses em Date são baseados em zero, então subtraímos 1 do valor do mês
    const jsDate = new Date(`${year}-${parseInt(month)}-${day}`)

    return jsDate
  }

  throw new AppError('Invalid Date.', 500)
}

export default formataDataParaJSDate
