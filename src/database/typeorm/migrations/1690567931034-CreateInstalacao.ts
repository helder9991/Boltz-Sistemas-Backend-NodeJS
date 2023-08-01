import { Table, type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateInstalacao1690567931034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'instalacoes',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'numInstalacao',
            type: 'bigint',
          },
          {
            name: 'numCliente',
            type: 'bigint',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('instalacoes')
  }
}
