import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


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

  @ApiProperty({ example: '7 (909) 777-77-77', description: 'Номер телефона' })
  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;


}
