import { Injectable } from '@nestjs/common';
import { Client } from 'src/entities/client.entity';
import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';

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