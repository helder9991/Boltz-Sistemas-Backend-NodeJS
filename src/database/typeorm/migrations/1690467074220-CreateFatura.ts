import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateFatura1690467074220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'faturas',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'filepath',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total',
            type: 'float',
          },
          {
            name: 'mesReferencia',
            type: 'date',
          },
          {
            name: 'mesVencimento',
            type: 'date',
          },
          {
            name: 'numCliente',
            type: 'bigint',
          },
          {
            name: 'numInstalacao',
            type: 'bigint',
          },
          {
            name: 'energiaEletricaUnidade',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'energiaEletricaQuantidade',
            type: 'integer',
          },
          {
            name: 'energiaEletricaPrecoUnidade',
            type: 'float',
          },
          {
            name: 'energiaEletricaValor',
            type: 'float',
          },
          {
            name: 'energiaInjetadaUnidade',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: 'energiaInjetadaQuantidade',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'energiaInjetadaPrecoUnidade',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'energiaInjetadaValor',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'enCompSemICMSUnidade',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: 'enCompSemICMSQuantidade',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'enCompSemICMSPrecoUnidade',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'enCompSemICMSValor',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'energiaCompensadaUnidade',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: 'energiaCompensadaQuantidade',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'energiaCompensadaPrecoUnidade',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'energiaCompensadaValor',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'energiaSCEEUnidade',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: 'energiaSCEEQuantidade',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'energiaSCEEPrecoUnidade',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'energiaSCEEValor',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'contribIlumPublicaMunicipalValor',
            type: 'float',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('faturas')
  }
}
