import { type MigrationInterface, type QueryRunner, TableColumn } from 'typeorm'

export class RemoveNumInstalacaoNumClienteDeFatura1690572594876
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('faturas', ['numCliente', 'numInstalacao'])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('faturas', [
      new TableColumn({ name: 'numCliente', type: 'bigint' }),
      new TableColumn({ name: 'numInstalacao', type: 'bigint' }),
    ])
  }
}
