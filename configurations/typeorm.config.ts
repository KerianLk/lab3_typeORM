import { DataSource } from 'typeorm';


const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'culinary',
  username: 'postgres',
  password: 'password123',
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: false,
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
});
export default ormConfig;
