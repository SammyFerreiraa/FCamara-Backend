import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706534432159 implements MigrationInterface {
    name = 'Default1706534432159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "returnedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "delay" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "delay" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "returnedAt" SET NOT NULL`);
    }

}
