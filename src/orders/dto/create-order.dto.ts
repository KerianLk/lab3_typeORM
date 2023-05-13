import { ApiProperty } from "@nestjs/swagger";
import { ArrayContains, IsArray, IsInt, IsNotEmpty, IsString, isArray, isInstance } from "class-validator";
import { Product} from "src/products/entities/product.entity";
import { Client } from "src/сlients/entities/client.entity";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: '1', description: 'заказщик' })
  client: Client;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: '10000', description: 'сумма заказа в рублях' })
  cost: number;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'доставлен', description: 'статус заказа' })
  status: string;


  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов продуктов',
  })
  products: Product[];
}