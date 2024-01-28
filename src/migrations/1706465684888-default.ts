import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706465684888 implements MigrationInterface {
    name = 'Default1706465684888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "copyId" uuid`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "UQ_c2b17c312305bae87a38bc8ed14" UNIQUE ("copyId")`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_c2b17c312305bae87a38bc8ed14" FOREIGN KEY ("copyId") REFERENCES "copies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_c2b17c312305bae87a38bc8ed14"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_c2b17c312305bae87a38bc8ed14"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "copyId"`);
    }

}
