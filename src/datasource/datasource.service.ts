import { Injectable } from '@nestjs/common';
import { Client } from 'src/сlients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class DatasourceService {
  private products: Product[] = [];
  private clients: Client[] = [];
  private orders: Order[] = [];

  getProducts(): Product[] {
    return this.products;
  }
  getClients(): Client[] {
    return this.clients;
  }

  getOrders(): Order[] {
    return this.orders;
  }
}
