import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1685790457161 implements MigrationInterface {
  name = 'CreateUserTable1685790457161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(30) NOT NULL, "bio" character varying(400), "avatar" character varying(200), "phone" character varying(25), "email" character varying(40), "password" character varying(50), "status" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
