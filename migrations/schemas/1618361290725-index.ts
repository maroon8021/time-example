import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class index1618361290725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "code",
            type: "varchar",
            //isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamptz",
            default: "NOW()",
          },
          {
            name: "updatedAt",
            type: "timestamptz",
            default: "NOW()",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "Sale",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "productId",
            type: "int",
          },
          {
            name: "count",
            type: "int",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamptz",
            default: "NOW()",
          },
          {
            name: "updatedAt",
            type: "timestamptz",
            default: "NOW()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
