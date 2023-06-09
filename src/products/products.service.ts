import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatasourceService } from 'src/datasource/datasource.service';
import {Order} from 'src/orders/entities/order.entity';
import { Client } from 'src/сlients/entities/client.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQuantityDTO} from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IncompleteProductDto } from './dto/incomplete-product.dto';

@Injectable()
export class ProductsService {
    constructor (
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
        ) {}

   async create(productDto: CreateProductDto): Promise<Product>{
        const product = this.productRepository.create();

        product.name = productDto.name;
        product.price = productDto.price;
        product.type = productDto.type;
        product.quantity = productDto.quantity;

        await this.productRepository.save(product);
        return product;
    }

    async findOne(id: number): Promise<Product> {
        const findProduct = await this.productRepository.findOne({
          where: {id},
          relations:{
            orders: true
          },
        }); 
        return findProduct;
    }

    async findIncomplete(): Promise<IncompleteProductDto[]> {
        const products = await this.productRepository.find(); 
        const incompleteProducts: IncompleteProductDto[] = products.map((product) => {
          const incompleteProduct = new IncompleteProductDto();
          incompleteProduct.name = product.name;
          return incompleteProduct;
        });
        return incompleteProducts; 
    }

    async findAll(): Promise<Product[]> {
        const products = await this.productRepository.find({
            relations:{
                orders: true
            },
        }); 
        return products;
    }

    async updateQuantity(productDto: UpdateProductQuantityDTO): Promise<Product> {
        const product =await this.productRepository.findOne({ where: {id: productDto.id}});
        product.quantity = productDto.quantity;
        return product;
    }

    async update(updatedProduct: Product) {
        const product = await this.productRepository.findOne({ where: { id: updatedProduct.id }});

        product.name = updatedProduct.name;
        product.price = updatedProduct.price;
        product.type = updatedProduct.type;
        product.quantity = updatedProduct.quantity;
        product.orders = updatedProduct.orders;

        await this.productRepository.save(product);
        return product;
    }

    remove(id: number) {
        this.productRepository.delete({ id});
    }

}