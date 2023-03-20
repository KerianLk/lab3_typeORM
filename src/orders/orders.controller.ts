import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';



@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(){
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.ordersService.findOne(+id);
  }

  @Get(':clientId')
  findOrderByClientId(@Param('clientId') id: string){
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedOrder: Order){
    return this.ordersService.update(+id, updatedOrder);
  }

  @Post()
  create(@Body() createOrder: Order){
    return this.ordersService.create(createOrder);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.ordersService.remove(+id);
  }
}