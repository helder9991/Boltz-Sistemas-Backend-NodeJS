import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddIdInstalacaoFK1690580545537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'faturas',
      new TableColumn({
        name: 'idInstalacao',
        type: 'varchar',
        length: '50',
        isNullable: true,
      }),
    )

    await queryRunner.createForeignKey(
      'faturas',
      new TableForeignKey({
        columnNames: ['idInstalacao'],
        referencedTableName: 'instalacoes',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('faturas', 'idInstalacao')

    await queryRunner.dropColumn('faturas', 'idInstalacao')
  }
}
