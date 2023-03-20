import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(){
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedProduct: Product){
    return this.productsService.update(+id, updatedProduct);
  }

  @Post()
  create(@Body() createProduct: Product){
    return this.productsService.create(createProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.productsService.remove(+id);
  }
}