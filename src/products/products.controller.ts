import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQuantityDTO } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';


@Controller('products')
@ApiTags('Продукты')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Все продукты (товары, которые есть в наличие кулинарии)' })
  @Get()
  findAll(){
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Поиск продукта по айди' })
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновить информацию о количестве продуктов в наличии' })
  @Put('change_quantity')
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
  create(@Body() createProduct: CreateProductDto): Promise<Product>{
    return this.productsService.create(createProduct);
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @Delete(':id')
  remove(@Param('id') id: string){
    return this.productsService.remove(+id);
  }
}