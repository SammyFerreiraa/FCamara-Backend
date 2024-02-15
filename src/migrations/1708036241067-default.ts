import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708036241067 implements MigrationInterface {
    name = 'Default1708036241067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "image"`);
    }

}
