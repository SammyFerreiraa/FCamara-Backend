import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708106561709 implements MigrationInterface {
    name = 'Default1708106561709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "category" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "category" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "category"`);
    }

}
