import {
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinTable,
    OneToOne,
    JoinColumn,
    ManyToMany,
    Column,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
import { Client } from '../../сlients/entities/client.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
  
@Entity('orders')
export class Order {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Client, example: '1', description: 'идентификатор заказчика' })  
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({name: 'client_id', referencedColumnName: "id"})
  client: Client;

  @ManyToMany((type) => Product, (product) => product.orders)
  @JoinTable({
      name: 'order_product',
      joinColumn: { name: 'order_id' },
      inverseJoinColumn: { name: 'product_id' },
  })
  products: Product[];

  @ApiProperty({ example: '2023-03-28 19:44:18.326569', description: 'дата создания' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ example: 'доставлен', description: 'статус заказа' })
  @Column()
  status: string;

  @ApiProperty({ example: '12234', description: 'сумма заказа в рублях' })
  @Column()
  cost: number;
}
  
export default Order;