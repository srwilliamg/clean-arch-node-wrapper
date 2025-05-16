import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSeqTables1729286167825 implements MigrationInterface {
  tables = ['pokemon', 'endpoint_log'];
  schema = 'poke';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.tables.map((table) =>
        queryRunner.query(
          `CREATE SEQUENCE ${this.schema}.seq_${table}_id INCREMENT 1 START 1;`,
        ),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.tables.map((table) =>
        queryRunner.query(`DROP SEQUENCE ${this.schema}.seq_${table}_id;`),
      ),
    );
  }
}
