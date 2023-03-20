import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Client } from 'src/entities/client.entity';
import Order from 'src/entities/order.entity';
import Product from 'src/entities/product.entity';
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