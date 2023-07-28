interface IUploadFaturaDTO {
  idInstalacao: string
  filepath: string
  total: number
  mesReferencia: Date
  mesVencimento: Date
  energiaEletricaUnidade: string
  energiaEletricaQuantidade: number
  energiaEletricaPrecoUnidade: number
  energiaEletricaValor: number
  energiaInjetadaUnidade?: string
  energiaInjetadaQuantidade?: number
  energiaInjetadaPrecoUnidade?: number
  energiaInjetadaValor?: number
  enCompSemICMSUnidade?: string
  enCompSemICMSQuantidade?: number
  enCompSemICMSPrecoUnidade?: number
  enCompSemICMSValor?: number
  energiaCompensadaUnidade?: string
  energiaCompensadaQuantidade?: number
  energiaCompensadaPrecoUnidade?: number
  energiaCompensadaValor?: number
  energiaSCEEUnidade?: string
  energiaSCEEQuantidade?: number
  energiaSCEEPrecoUnidade?: number
  energiaSCEEValor?: number
  contribIlumPublicaMunicipalValor: number
}

export default IUploadFaturaDTO
