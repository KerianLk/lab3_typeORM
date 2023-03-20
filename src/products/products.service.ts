import { HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor (private readonly datasourceService: DatasourceService) {}

    create (product: Product) {
        this.datasourceService.getProducts().push(product);
        return product;
    }

    findOne(id: number) {
        return this.datasourceService.getProducts()
        .find((product) => product.id === id);
    }

    findAll(): Product[] {
        return this.datasourceService.getProducts();
    }

    update(id: number, updatedProduct: Product) {
        const index = this.datasourceService.getProducts()
        .findIndex((product) => product.id === id);
        this.datasourceService.getProducts()[index] = updatedProduct;

        return this.datasourceService.getProducts()[index];
    }

    remove(id: number) {
        const index = this.datasourceService.getProducts()
        .findIndex((product) => product.id === id);
        this.datasourceService.getProducts().splice(index, 1);

        return HttpStatus.OK;
    }

}