import { Injectable } from '@nestjs/common';
import { Client } from 'src/сlients/client.entity';
import { Product } from 'src/products/product.entity';
import { Order } from 'src/orders/order.entity';

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