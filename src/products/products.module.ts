import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Client } from 'src/сlients/entities/client.entity';
import { Order} from 'src/orders/entities/order.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';


@Module({
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Order, Product, Client]), 
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}