import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('faturas')
export class Fatura {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @Column()
  idInstalacao?: string

  @Column()
  filepath: string

  @Column({ type: 'float' })
  total: number

  @Column()
  mesReferencia: Date

  @Column()
  mesVencimento: Date

  @Column({ type: 'float' })
  energiaEletricaUnidade: string

  @Column({ type: 'bigint' })
  energiaEletricaQuantidade: number

  @Column({ type: 'float' })
  energiaEletricaPrecoUnidade: number

  @Column()
  energiaEletricaValor: number

  @Column({ type: 'float' })
  energiaInjetadaUnidade?: string

  @Column({ type: 'bigint' })
  energiaInjetadaQuantidade?: number

  @Column({ type: 'float' })
  energiaInjetadaPrecoUnidade?: number

  @Column({ type: 'float' })
  energiaInjetadaValor?: number

  @Column({ type: 'float' })
  enCompSemICMSUnidade?: string

  @Column({ type: 'bigint' })
  enCompSemICMSQuantidade?: number

  @Column({ type: 'float' })
  enCompSemICMSPrecoUnidade?: number

  @Column({ type: 'float' })
  enCompSemICMSValor?: number

  @Column({ type: 'float' })
  energiaCompensadaUnidade?: string

  @Column({ type: 'bigint' })
  energiaCompensadaQuantidade?: number

  @Column({ type: 'float' })
  energiaCompensadaPrecoUnidade?: number

  @Column({ type: 'float' })
  energiaCompensadaValor?: number

  @Column({ type: 'float' })
  energiaSCEEUnidade?: string

  @Column({ type: 'bigint' })
  energiaSCEEQuantidade?: number

  @Column({ type: 'float' })
  energiaSCEEPrecoUnidade?: number

  @Column({ type: 'float' })
  energiaSCEEValor?: number

  @Column({ type: 'float' })
  contribIlumPublicaMunicipalValor: number
}

export default Fatura
