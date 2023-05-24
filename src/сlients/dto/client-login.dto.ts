import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsNotEmpty, IsString,
  MinLength
} from 'class-validator';


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
