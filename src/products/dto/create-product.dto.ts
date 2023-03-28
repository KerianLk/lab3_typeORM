import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

  @ApiProperty({ example: 'щербет смородиновый', description: 'название продукта' })
  name: string;
  @ApiProperty({ example: '100', description: 'цена продукта в рублях' })
  price: number;
  @ApiProperty({ example: '50', description: 'количество (гр.)' })
  quantity: number;
  @ApiProperty({ example: 'мороженое', description: 'категория продукта' })
  type: string;
}
  