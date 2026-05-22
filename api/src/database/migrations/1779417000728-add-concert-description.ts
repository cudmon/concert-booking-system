import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConcertDescription1779417000728 implements MigrationInterface {
  name = "AddConcertDescription1779417000728";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "concerts" ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "concerts" DROP COLUMN "description"`);
  }
}
