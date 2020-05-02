import { BasketService } from '../services/basket.service';
import { Product } from '../interfaces';


export class BasketUpdate {

    products: Product[];
    product: Product;

    constructor(public basketService: BasketService) {
    }

    addProduct(index?: number) {
        const product = index ? this.products[index]: this.product;

        if(!product.quantity) {
          product.quantity = 0;
        }
        product.quantity++;
        this.basketService.addProductToBasket(product);
      }

    removeProduct(index?: number) {
        const product = index ? this.products[index]: this.product;

        product.quantity--;
        this.basketService.reduceProductFromBasket(product);
    }
}