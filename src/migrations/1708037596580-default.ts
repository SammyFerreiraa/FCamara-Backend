import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708037596580 implements MigrationInterface {
    name = 'Default1708037596580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "recommended" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "recommended"`);
    }

}
