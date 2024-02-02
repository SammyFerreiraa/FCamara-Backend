import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706900069581 implements MigrationInterface {
    name = 'Default1706900069581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "rentalId" uuid`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "UQ_f1a96243eafa430385625d30c00" UNIQUE ("rentalId")`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "bookId" uuid`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "UQ_63280a29e63109a052767f95134" UNIQUE ("bookId")`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_f1a96243eafa430385625d30c00" FOREIGN KEY ("rentalId") REFERENCES "rentals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_63280a29e63109a052767f95134" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_63280a29e63109a052767f95134"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_f1a96243eafa430385625d30c00"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "UQ_63280a29e63109a052767f95134"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_f1a96243eafa430385625d30c00"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "rentalId"`);
    }

}
