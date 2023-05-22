import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/entities/order.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";

@Entity('clients')
export class Client {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn() 
  id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  @Column({}) 
  fullname: string;

  @ApiProperty({ example: 'i_i@mail.ru', description: 'email' })
  @Column()
  email: string;

  @OneToMany(() => Order, order => order.client)
  orders: Order[];

  @ApiProperty({ example: '7 (909) 777-77-77', description: 'Номер телефона' })
  @Column()
  phone: string;
  
  @ApiProperty({ example: '2023-03-28 19:44:18.326569', description: 'дата создания' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ example: '2023-03-28 19:44:18.326569', description: 'дата обновления' })
  @UpdateDateColumn()
  updated_at: Date;
  
}
