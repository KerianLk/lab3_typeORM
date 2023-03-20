
import Order from 'src/orders/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({}) 
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;


}
