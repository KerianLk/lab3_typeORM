import Product from "src/products/product.entity";
import { Client } from "src/сlients/client.entity";

export class CreateOrderDto {
  client: Client;
  cost: number;
  status: string;
  products: Product[];
}