import { Module } from '@nestjs/common';
import { ClientsModule } from './сlients/clients.module';
import { DatasourceModule } from './datasource/datasource.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { Client } from './сlients/entities/client.entity';

@Module({
  imports: [
    ProductsModule, 
    ClientsModule, 
    OrdersModule, 
    DatasourceModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres', //тип подключаемой БД
      port: 5432, //порт
      database: 'culinaria',
      username: 'postgres', //имя пользователя
      password: 'password123', //пароль
      host: 'localhost', //хост, в нашем случае БД развернута локально
      synchronize: false, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
      logging: 'all', //включим логирование для удобства отслеживания процессов
      entities: [Order,Product,Client] //указываем путь к сущностям
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}