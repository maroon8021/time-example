import { Entity, CreateDateColumn, Column, PrimaryColumn } from "typeorm";

export type PlainProduct = {
  id?: number;
  code: string;
  name: string;
  description: string;
  createdAt?: Date;
};

@Entity({ name: "Product" })
export class Product {
  @PrimaryColumn()
  readonly id!: number;

  @Column({ name: "code" })
  readonly code!: string;

  @Column({ name: "name" })
  readonly name!: string;

  @Column({ name: "description" })
  description!: string;

  @CreateDateColumn({ name: "createdAt" })
  readonly createdAt!: Date;

  @CreateDateColumn({ name: "updatedAt" })
  readonly updatedAt!: Date;

  constructor(attrs?: PlainProduct) {
    if (!attrs) {
      return this;
    }
    if (attrs.id) this.id = attrs.id;
    this.code = attrs.code;
    this.name = attrs.name;
    this.description = attrs.description;
    if (attrs.createdAt) this.createdAt = attrs.createdAt;
  }
}
