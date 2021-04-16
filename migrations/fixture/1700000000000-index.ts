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
        id: 1,
        code: "AAA",
        name: "product-A",
        description: "This is product-A",
      })
    );
    await saleRepository.save(
      new Sale({
        id: 1,
        productId: 1,
        count: 1,
        description: "product-A is sold",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
