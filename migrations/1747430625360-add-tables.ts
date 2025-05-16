import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1747430625360 implements MigrationInterface {
    name = 'AddTables1747430625360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "poke"."pokemon" ("tb_id" bigint NOT NULL DEFAULT nextval('poke.seq_pokemon_id'), "tb_name" character varying(100), "tb_created_at" TIMESTAMP NOT NULL DEFAULT now(), "tb_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tb_deleted_at" TIMESTAMP, CONSTRAINT "PK_38a7050fd11ade96895440bdf5a" PRIMARY KEY ("tb_id"))`);
        await queryRunner.query(`CREATE INDEX "tb__name_idx" ON "poke"."pokemon" ("tb_name") `);
        await queryRunner.query(`CREATE TABLE "poke"."endpoint_log" ("enl_id" bigint NOT NULL DEFAULT nextval('poke.seq_endpoint_log_id'), "enl_name" character varying(100), "enl_payload" jsonb NOT NULL, "enl_response" jsonb NOT NULL, "enl_start_time" TIMESTAMP, "enl_end_time" TIMESTAMP, "enl_executionTime" numeric, "enl_created_at" TIMESTAMP NOT NULL DEFAULT now(), "enl_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "enl_deleted_at" TIMESTAMP, CONSTRAINT "PK_39f07a01a13b40b2c30b11bd7c8" PRIMARY KEY ("enl_id"))`);
        await queryRunner.query(`CREATE INDEX "enl__name_idx" ON "poke"."endpoint_log" ("enl_name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "poke"."enl__name_idx"`);
        await queryRunner.query(`DROP TABLE "poke"."endpoint_log"`);
        await queryRunner.query(`DROP INDEX "poke"."tb__name_idx"`);
        await queryRunner.query(`DROP TABLE "poke"."pokemon"`);
    }

}
