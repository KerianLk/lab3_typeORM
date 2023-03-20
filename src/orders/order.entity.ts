import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinTable,
    OneToOne,
    JoinColumn,
    ManyToMany,
    Column,
  } from 'typeorm';
import { Client } from '../сlients/client.entity';
import { Product } from '../products/product.entity';
  
  @Entity('orders')
 export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @OneToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    client: Client;
  
    @ManyToMany((type) => Product, (product) => product.orders)
    @JoinTable({
        name: 'order_product',
        joinColumn: { name: 'order_id' },
        inverseJoinColumn: { name: 'product_id' },
    })
    products: Product[];

    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    status: string;

    @Column()
    cost: number;
  }
  
  export default Order;