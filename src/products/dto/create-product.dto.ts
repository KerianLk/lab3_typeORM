import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'щербет смородиновый', description: 'название продукта' })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: '100', description: 'цена продукта в рублях' })
  price: number;

  @IsInt()
  @ApiProperty({ example: '50', description: 'количество (гр.)' })
  quantity: number;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'мороженое', description: 'категория продукта' })
  type: string;
}
  