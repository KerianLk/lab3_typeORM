import Product from "src/products/entities/product.entity";
import { Client } from "src/сlients/entities/client.entity";

export class CreateOrderDto {
  client: Client;
  cost: number;
  status: string;
  products: Product[];
}