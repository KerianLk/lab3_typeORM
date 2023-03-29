import { Order } from '../src/orders/entities/order.entity';
import { Product } from '../src/products/entities/product.entity';
import { Client } from '../src/сlients/entities/client.entity';
import { DataSource } from 'typeorm';
 
 
const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'culinary',
  username: 'postgres',
  password: 'password123',
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
});
export default ormConfig;

