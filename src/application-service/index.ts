import { getRepository } from "typeorm";
import { Product } from "../models/product";

export class Index {
  static getProducts() {
    return getRepository(Product).find();
  }
}
