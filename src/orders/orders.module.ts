import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Client } from 'src/сlients/entities/client.entity';
import {Order} from 'src/orders/entities/order.entity';
import {Product} from 'src/products/entities/product.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [DatasourceModule,
    TypeOrmModule.forFeature([Order, Product, Client]), 
],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}