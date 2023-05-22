import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';



@Controller('orders')
@ApiTags('Заказы')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Все заказы' })
  @Get()
  findAll(){
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Поиск по айди заказа' })
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.ordersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Все закрытые (доставленные) заказы' })
  @Get('/closed')
  findClosed(){
    return this.ordersService.findClosed();
  }

  @ApiOperation({ summary: 'Обновление информации о заказе' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatedOrder: Order){
    return this.ordersService.update(+id, updatedOrder);
  }

  @ApiOperation({ summary: 'Создание записи о заказе' })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createOrder: CreateOrderDto){
    return this.ordersService.create(createOrder);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @Delete(':id')
  remove(@Param('id') id: string){
    return this.ordersService.remove(+id);
  }
}