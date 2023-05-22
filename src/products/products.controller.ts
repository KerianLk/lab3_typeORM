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
import { Reflector } from '@nestjs/core';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQuantityDTO } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { RolesGuard } from 'src/сlients/roles/guard';
import { Roles } from 'src/сlients/roles/decorator';
import { Role } from '../сlients/entities/role.enum';

@Controller('products')
@UseGuards(RolesGuard)
@ApiTags('Продукты')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiOperation({ summary: 'Ограниченная информация о товарах' })
  @Roles(Role.ADMIN, Role.USER)
  @Get('incomplete')
  findIncomplete() {
    return this.productsService.findIncomplete();
  }

  @ApiOperation({
    summary: 'Все продукты (товары, которые есть в наличии кулинарии)',
  })
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Поиск продукта по айди' })
  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Обновить информацию о количестве продуктов в наличии',
  })
  @Put('change_quantity')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  updateQuantity(
    @Body() updatedProduct: UpdateProductQuantityDTO,
  ): Promise<Product> {
    return this.productsService.updateQuantity(updatedProduct);
  }

  @ApiOperation({ summary: 'Обновить информацию о товаре (полностью)' })
  @Put('/update')
  @Roles(Role.ADMIN)
  update(@Body() updatedProduct: Product): Promise<Product> {
    return this.productsService.update(updatedProduct);
  }

  @ApiOperation({ summary: 'Создание товара' })
  @Post()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  create(@Body() createProduct: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProduct);
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}