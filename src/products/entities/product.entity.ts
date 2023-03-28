import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
  
  
@Entity('product')
export class Product {
  @ApiProperty({ example: '1', description: 'идентификатор продукта' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'шарлотка', description: 'название продукта' })
  @Column()
  name: string;

  @ApiProperty({ example: '400', description: 'количество (гр.)' })
  @Column('decimal')
  quantity: number;

  @ApiProperty({ example: '100', description: 'цена продукта в рублях' })
  @Column('int')
  price: number;

  @ApiProperty({ example: 'выпечка', description: 'категория продукта' })
  @Column()
  type: string;

  @ManyToMany((type) => Order, (order) => order.products)
  @JoinTable({
      name: 'order_product',
      joinColumn: { name: 'product_id' },
      inverseJoinColumn: { name: 'order_id' },
  })
  orders: Order[];

  @ApiProperty({ example: '2023-03-28 19:44:18.326569', description: 'дата создания' })
  @CreateDateColumn()
  created_at: Date;
}
  
