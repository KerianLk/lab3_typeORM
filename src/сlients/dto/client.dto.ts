import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'qwertyui', description: 'Пароль' })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'i_i@mail.ru', description: 'email' })
  email: string;

  @IsPhoneNumber('RU')
  @ApiProperty({ example: '7 (909) 777-77-77', description: 'Номер телефона' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user', description: 'Роль' })
  role: string;

  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов заказов',
  })
  orders: number[];
}

export class LogInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'i_i@mail.ru', description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'qwertyui', description: 'Пароль' })
  password: string;
}
