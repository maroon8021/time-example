import { Entity, CreateDateColumn, Column, PrimaryColumn } from "typeorm";

export type PlainSale = {
  id?: number;
  productId: number;
  count: number;
  description: string;
  createdAt?: Date;
};

@Entity({ name: "Sale" })
export class Sale {
  @PrimaryColumn()
  readonly id!: number;

  @Column({ name: "productId" })
  readonly productId!: number;

  @Column({ name: "count" })
  readonly count!: number;

  @Column({ name: "description" })
  description!: string;

  @CreateDateColumn({ name: "createdAt" })
  readonly createdAt!: Date;

  @CreateDateColumn({ name: "updatedAt" })
  readonly updatedAt!: Date;

  constructor(attrs?: PlainSale) {
    if (!attrs) {
      return this;
    }
    if (attrs.id) this.id = attrs.id;
    this.productId = attrs.productId;
    this.count = attrs.count;
    this.description = attrs.description;
    if (attrs.createdAt) this.createdAt = attrs.createdAt;
  }
}
