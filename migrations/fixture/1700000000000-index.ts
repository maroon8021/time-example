import { MigrationInterface, QueryRunner } from "typeorm";
import { Product } from "../../src/models/product";
import { Sale } from "../../src/models/sale";

export class index1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const productRepository = entityManager.getRepository(Product);
    const saleRepository = entityManager.getRepository(Sale);
    await productRepository.save(
      new Product({
        code: "AAA",
        name: "product-A",
        description: "This is product-A",
      })
    );
    // await saleRepository.save(
    //   new Sale({
    //     productId: 1,
    //     count: 1,
    //     description: "product-A is sold",
    //   })
    // );

    await entityManager.query(`
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30');
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30 14:59:59');
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30 14:59:59');
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30 14:59:59.000');
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30 14:59:59.999');
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30 14:59:59.9999');
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30 14:59:59.999999');
    INSERT INTO "Product" (code, name, description, "createdAt") values ('a','a','a', '2021-04-30 14:59:59.9999999');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
