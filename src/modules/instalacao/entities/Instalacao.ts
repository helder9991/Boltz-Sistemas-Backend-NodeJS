import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('instalacoes')
export class Instalacao {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @Column()
  numCliente: number

  @Column()
  numInstalacao: number
}

export default Instalacao
