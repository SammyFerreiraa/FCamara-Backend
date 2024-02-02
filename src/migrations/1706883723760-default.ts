import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706883723760 implements MigrationInterface {
    name = 'Default1706883723760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "delays" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "delays" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "delays"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "delays"`);
    }

}
