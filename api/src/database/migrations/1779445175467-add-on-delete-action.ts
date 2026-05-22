import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnDeleteAction1779445175467 implements MigrationInterface {
  name = "AddOnDeleteAction1779445175467";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_b8a806ead6ca04fb91112e41260"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "user_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "concert_id" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_b8a806ead6ca04fb91112e41260" FOREIGN KEY ("concert_id") REFERENCES "concerts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_b8a806ead6ca04fb91112e41260"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "created_at" date NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "concert_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "user_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_b8a806ead6ca04fb91112e41260" FOREIGN KEY ("concert_id") REFERENCES "concerts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
