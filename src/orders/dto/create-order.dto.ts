import { ApiProperty } from "@nestjs/swagger";
import { Product} from "src/products/entities/product.entity";
import { Client } from "src/сlients/entities/client.entity";

export class CreateOrderDto {

  @ApiProperty({ example: '1', description: 'заказщик' })
  client: Client;

  @ApiProperty({ example: '10000', description: 'сумма заказа в рублях' })
  cost: number;
  
  @ApiProperty({ example: 'доставлен', description: 'статус заказа' })
  status: string;

  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов продуктов',
  })
  products: Product[];
}