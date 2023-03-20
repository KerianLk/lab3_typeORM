import Product from "src/products/product.entity";
import { Client } from "src/сlients/client.entity";

export class CreateOrderDTO {
  client: Client;
  products: Product[];
}