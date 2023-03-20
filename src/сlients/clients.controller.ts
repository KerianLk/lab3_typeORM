import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';



@Controller('clients')
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
  
  //@Get('incomplete')
  //findIncomplete(){
  //  return this.clientsService.findIncomplete();
  //}


  @Put(':id')
  update(@Param('id') id: string, @Body() updatedClient: Client){
    return this.clientsService.update(+id, updatedClient);
  }

  @Post()
  create(@Body() createClient: Client){
    return this.clientsService.create(createClient);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.clientsService.remove(+id);
  }
}