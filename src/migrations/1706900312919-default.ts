import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706900312919 implements MigrationInterface {
    name = 'Default1706900312919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_63280a29e63109a052767f95134"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "UQ_63280a29e63109a052767f95134"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "bookId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" ADD "bookId" uuid`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "UQ_63280a29e63109a052767f95134" UNIQUE ("bookId")`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_63280a29e63109a052767f95134" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
