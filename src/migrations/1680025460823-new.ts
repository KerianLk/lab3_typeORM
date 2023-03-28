import { MigrationInterface, QueryRunner } from "typeorm";

export class new1680025460823 implements MigrationInterface {
    name = 'new1680025460823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_c1485ff3203bb824ec178c15244"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_ea143999ecfa6a152f2202895e2" PRIMARY KEY ("order_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_400f1584bf37c21172da3b15e2"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD "product_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_ea143999ecfa6a152f2202895e2"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_c1485ff3203bb824ec178c15244" PRIMARY KEY ("order_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_c1485ff3203bb824ec178c15244"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_400f1584bf37c21172da3b15e2d" PRIMARY KEY ("product_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea143999ecfa6a152f2202895e"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD "order_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_400f1584bf37c21172da3b15e2d"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_c1485ff3203bb824ec178c15244" PRIMARY KEY ("product_id", "order_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_400f1584bf37c21172da3b15e2" ON "order_product" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea143999ecfa6a152f2202895e" ON "order_product" ("order_id") `);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea143999ecfa6a152f2202895e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_400f1584bf37c21172da3b15e2"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_c1485ff3203bb824ec178c15244"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_400f1584bf37c21172da3b15e2d" PRIMARY KEY ("product_id")`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD "order_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_ea143999ecfa6a152f2202895e" ON "order_product" ("order_id") `);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_400f1584bf37c21172da3b15e2d"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_c1485ff3203bb824ec178c15244" PRIMARY KEY ("order_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_c1485ff3203bb824ec178c15244"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_ea143999ecfa6a152f2202895e2" PRIMARY KEY ("order_id")`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD "product_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_400f1584bf37c21172da3b15e2" ON "order_product" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "PK_ea143999ecfa6a152f2202895e2"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "PK_c1485ff3203bb824ec178c15244" PRIMARY KEY ("product_id", "order_id")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
