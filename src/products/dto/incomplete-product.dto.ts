import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class IncompleteProductDto {

    @IsNotEmpty()
    @ApiProperty({ example: 'шарлотка', description: 'название продукта' })
    name: string;
  }