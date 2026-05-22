import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1779375876467 implements MigrationInterface {
  name = "Initial1779375876467";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`
    );

    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('RESERVED', 'CANCELLED')`
    );

    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'RESERVED', "created_at" date NOT NULL DEFAULT now(), "user_id" integer, "concert_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "concerts" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "capacity" integer NOT NULL DEFAULT '0', "sold_tickets" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_825d069e22ba7624b067b51ebbf" UNIQUE ("name"), CONSTRAINT "PK_6ca96059628588a3988a5f3236a" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_b8a806ead6ca04fb91112e41260" FOREIGN KEY ("concert_id") REFERENCES "concerts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_b8a806ead6ca04fb91112e41260"`
    );

    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`
    );

    await queryRunner.query(`DROP TABLE "concerts"`);

    await queryRunner.query(`DROP TABLE "orders"`);

    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);

    await queryRunner.query(`DROP TABLE "users"`);
  }
}
