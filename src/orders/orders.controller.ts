import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { RolesGuard } from 'src/сlients/roles/guard';
import { Roles } from 'src/сlients/roles/decorator';
import { Role } from '../сlients/entities/role.enum';

@Controller('orders')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@ApiTags('Заказы')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiOperation({ summary: 'Все закрытые (доставленные) заказы' })
  @Get('delivered')
  findClosed() {
    return this.ordersService.findClosed('доставлен');
  }

  @ApiOperation({ summary: 'Все заказы' })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Поиск по айди заказа' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление информации о заказе' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatedOrder: Order) {
    return this.ordersService.update(+id, updatedOrder);
  }

  @ApiOperation({ summary: 'Создание записи о заказе' })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createOrder: CreateOrderDto) {
    return this.ordersService.create(createOrder);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
