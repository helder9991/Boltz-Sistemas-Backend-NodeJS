import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('faturas')
export class Fatura {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @Column()
  filepath: string

  @Column()
  total: number

  @Column()
  mesReferencia: Date

  @Column()
  mesVencimento: Date

  @Column()
  numCliente: number

  @Column()
  numInstalacao: number

  @Column()
  energiaEletricaUnidade: string

  @Column()
  energiaEletricaQuantidade: number

  @Column()
  energiaEletricaPrecoUnidade: number

  @Column()
  energiaEletricaValor: number

  @Column()
  energiaInjetadaUnidade?: string

  @Column()
  energiaInjetadaQuantidade?: number

  @Column()
  energiaInjetadaPrecoUnidade?: number

  @Column()
  energiaInjetadaValor?: number

  @Column()
  enCompSemICMSUnidade?: string

  @Column()
  enCompSemICMSQuantidade?: number

  @Column()
  enCompSemICMSPrecoUnidade?: number

  @Column()
  enCompSemICMSValor?: number

  @Column()
  energiaCompensadaUnidade?: string

  @Column()
  energiaCompensadaQuantidade?: number

  @Column()
  energiaCompensadaPrecoUnidade?: number

  @Column()
  energiaCompensadaValor?: number

  @Column()
  energiaSCEEUnidade?: string

  @Column()
  energiaSCEEQuantidade?: number

  @Column()
  energiaSCEEPrecoUnidade?: number

  @Column()
  energiaSCEEValor?: number

  @Column()
  contribIlumPublicaMunicipalValor: number
}

export default Fatura
