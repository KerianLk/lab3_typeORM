import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/client.dto';



@Controller('clients')
@ApiTags('Клиенты')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(){
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.clientsService.findOne(+id);
  }
  
  @Get('incomplete')
  findIncomplete(){
    return this.clientsService.findIncomplete();
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updatedClient: Client){
    return this.clientsService.update(+id, updatedClient);
  }

  @ApiOperation({ summary: 'Создание клиента' })
  @Post()
  create(@Body() createClient: CreateClientDto){
    return this.clientsService.create(createClient);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.clientsService.remove(+id);
  }
}