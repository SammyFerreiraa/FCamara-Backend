import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706463667427 implements MigrationInterface {
    name = 'Default1706463667427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_ffe1d7b0b585885667954522513"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "REL_ffe1d7b0b58588566795452251"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "REL_ffe1d7b0b58588566795452251" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_ffe1d7b0b585885667954522513" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
