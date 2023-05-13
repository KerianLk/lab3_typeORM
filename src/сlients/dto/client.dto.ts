import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateClientDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  fullname: string;

  @IsEmail()
  @ApiProperty({ example: 'i_i@mail.ru', description: 'email' })
  email: string;

  @IsPhoneNumber("RU")
  @ApiProperty({ example: '7 (909) 777-77-77', description: 'Номер телефона' })
  phone: string;
    

  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов заказов',
  })
  orders: number[];
}
  