import { ApiProperty } from "@nestjs/swagger";

export class IncompleteClientDto {
    @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
    fullName: string;
  }
  
  