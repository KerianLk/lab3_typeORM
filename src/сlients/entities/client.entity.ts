import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  
  @ApiProperty({ example: '2023-03-28 19:44:18.326569', description: 'дата создания' })
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty({ example: '2023-03-28 19:44:18.326569', description: 'дата обновления' })
  @UpdateDateColumn()
  updatet_at: Date;
}
