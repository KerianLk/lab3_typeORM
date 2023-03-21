import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatasourceService } from 'src/datasource/datasource.service';
import Product from 'src/products/entities/product.entity';
import { Client } from 'src/сlients/entities/client.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor (
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
        ) {}

    async create(orderDto: CreateOrderDto): Promise<Order>{
        const order = this.orderRepository.create();

        order.client = orderDto.client;
        order.cost = orderDto.cost;
        order.status = orderDto.status;

        const products = await this.productRepository.findBy({
            id: In(orderDto.products),
        });

        order.products = products;

        await this.orderRepository.save(order);
        return order;
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: {
                products: true,
                client: true,
            },
        });
        return order;
    }

     async findAll(): Promise<Order[]> {
        const orders = await this.orderRepository.find({
            relations: {
                products: true,
                client: true,
            },
        });
        return orders; 
    }

    async update(id: number, updatedOrder: Order) {
        const order = await this.orderRepository.findOne({ where: { id }});

        order.status = updatedOrder.status;
        order.cost =updatedOrder.cost;
        order.client = updatedOrder.client;
        order.products = updatedOrder.products;

        await this.orderRepository.save(order);
        return order;
    }

    remove(id: number) {
        this.orderRepository.delete({ id});
    }

}