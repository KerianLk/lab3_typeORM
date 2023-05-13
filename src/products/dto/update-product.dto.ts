import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateProductQuantityDTO {

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: '3', description: 'идентификатор товара' })
  id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: '50', description: 'количество (гр.)' })
  quantity: number;
}