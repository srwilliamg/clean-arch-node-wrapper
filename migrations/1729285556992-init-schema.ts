import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1729285556992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "poke";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA "poke" CASCADE;`, undefined);
  }
}
