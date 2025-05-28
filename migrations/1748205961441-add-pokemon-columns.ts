import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPokemonColumns1748205961441 implements MigrationInterface {
    name = 'AddPokemonColumns1748205961441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" ADD "tb_ext_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" ADD "tb_weight" integer`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" ADD "tb_height" integer`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" ADD "tb_url_back_default" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" ADD "tb_url_front_default" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" DROP COLUMN "tb_url_front_default"`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" DROP COLUMN "tb_url_back_default"`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" DROP COLUMN "tb_height"`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" DROP COLUMN "tb_weight"`);
        await queryRunner.query(`ALTER TABLE "poke"."pokemon" DROP COLUMN "tb_ext_id"`);
    }

}
