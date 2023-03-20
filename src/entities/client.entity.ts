
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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
