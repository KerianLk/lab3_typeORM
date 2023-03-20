import { HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
    constructor (private readonly datasourceService: DatasourceService) {}
    create (order: Order) {
        this.datasourceService.getOrders().push(order);
        return order;
    }

    findOne(id: number) {
        return this.datasourceService.getOrders()
        .find((order) => order.id === id);
    }

    findOrderByClientId(clientId: number) {
        return this.datasourceService.getOrders()
        .find((order) => order.clientId === clientId);
    }
    findAll(): Order[] {
        return this.datasourceService.getOrders();
    }

    update(id: number, updatedOrder: Order) {
        const index = this.datasourceService.getOrders()
        .findIndex((order) => order.id === id);
        this.datasourceService.getOrders()[index] = updatedOrder;

        return this.datasourceService.getOrders()[index];
    }

    remove(id: number) {
        const index = this.datasourceService.getOrders()
        .findIndex((order) => order.id === id);
        this.datasourceService.getOrders().splice(index, 1);

        return HttpStatus.OK;
    }

}