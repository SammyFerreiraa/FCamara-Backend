import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706368877781 implements MigrationInterface {
    name = 'Default1706368877781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rentals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rentedAt" TIMESTAMP NOT NULL, "returnedAt" TIMESTAMP NOT NULL, "delay" integer NOT NULL, "copyId" uuid, "userId" uuid, CONSTRAINT "REL_ffe1d7b0b58588566795452251" UNIQUE ("userId"), CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_e49aa38cf46ecf44fcd6cb2861a" FOREIGN KEY ("copyId") REFERENCES "copies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_ffe1d7b0b585885667954522513" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_ffe1d7b0b585885667954522513"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_e49aa38cf46ecf44fcd6cb2861a"`);
        await queryRunner.query(`DROP TABLE "rentals"`);
    }

}
