import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  fullname: string;

  @ApiProperty({ example: 'i_i@mail.ru', description: 'email' })
  email: string;

  @ApiProperty({ example: '7 (909) 777-77-77', description: 'Номер телефона' })
  phone: string;
    
  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов заказов',
  })
  orders: number[];
}
  