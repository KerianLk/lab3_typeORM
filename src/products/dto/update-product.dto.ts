import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductQuantityDTO {

  @ApiProperty({ example: '3', description: 'идентификатор товара' })
  id: number;

  @ApiProperty({ example: '50', description: 'количество (гр.)' })
  quantity: number;
}