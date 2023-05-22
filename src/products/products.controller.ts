import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQuantityDTO } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';


@Controller('products')
@ApiTags('Продукты')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Все продукты (товары, которые есть в наличии кулинарии)' })
  @Get()
  findAll(){
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Поиск продукта по айди' })
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Ограниченная информация о товарах' })
  @Get('incomplete')
  findIncomplete(){
    return this.productsService.findIncomplete();
  }

  @ApiOperation({ summary: 'Обновить информацию о количестве продуктов в наличии' })
  @Put('change_quantity')
  @UsePipes(new ValidationPipe())
  updateQuantity(@Body()updatedProduct: UpdateProductQuantityDTO): Promise<Product>{
    return this.productsService.updateQuantity(updatedProduct);
  }

  @ApiOperation({ summary: 'Обновить информацию о товаре (полностью)' })
  @Put('/update')
  update(@Body()updatedProduct: Product): Promise<Product>{
    return this.productsService.update(updatedProduct);
  }

  @ApiOperation({ summary: 'Создание товара' })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProduct: CreateProductDto): Promise<Product>{
    return this.productsService.create(createProduct);
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @Delete(':id')
  remove(@Param('id') id: string){
    return this.productsService.remove(+id);
  }
}