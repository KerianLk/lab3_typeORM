import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Order } from 'src/orders/entities/order.entity';
import { Client } from 'src/сlients/entities/client.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Client, Order]), 
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}

