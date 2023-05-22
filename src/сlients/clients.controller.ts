import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';

import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/client.dto';
import { AuthGuard } from '@nestjs/passport';



@Controller('clients')
@ApiSecurity("X-API-KEY", ["X-API-KEY"])
@ApiTags('Клиенты')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Все клиенты' })
  @Get()
  findAll(){
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Поиск по айди клиента' })
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.clientsService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Ограниченная информация о клиентах' })
  @Get()
  findIncomplete(){
    return this.clientsService.findIncomplete();
  }


  @ApiOperation({ summary: 'Обновление информации клиента (по идентификатору)' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatedClient: Client){
    return this.clientsService.update(+id, updatedClient);
  }

  @ApiOperation({ summary: 'Создание клиента' })
  @Post()
  @UseGuards(AuthGuard("api-key"))
  @UsePipes(new ValidationPipe())
  create(@Body() createClient: CreateClientDto){
    return this.clientsService.create(createClient);
  }

  @ApiOperation({ summary: 'Удаление клиента' })
  @Delete(':id')
  remove(@Param('id') id: string){
    return this.clientsService.remove(+id);
  }
}