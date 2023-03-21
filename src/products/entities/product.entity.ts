import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
import {Order} from '../../orders/entities/order.entity';
  
  
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;
  
    @Column()
    name: string;
  
    @Column('decimal')
    quantity: number;
  
    @Column('int')
    price: number;

    @Column()
    type: string;

    @ManyToMany((type) => Order, (order) => order.products)
    @JoinTable({
        name: 'order_product',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'order_id' },
    })
    orders: Order[];
  
    @CreateDateColumn()
    created_at: Date;
  }
  
  