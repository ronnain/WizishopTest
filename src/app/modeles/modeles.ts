import { BasketService } from '../services/basket.service';
import { Product } from '../interfaces';


export class BasketUpdate {

    products: Product[];
    product: Product;

    constructor(public basketService: BasketService) {
    }

    addProduct(index?: number) {
      const product = (typeof index === 'number') ? this.products[index]: this.product;

      if(!product.quantity) {
        product.quantity = 0;
      }
      product.quantity++;
      this.basketService.addProductToBasket(product);
    }

    removeProduct(index?: number) {
      const product = (typeof index === 'number') ? this.products[index]: this.product;

      product.quantity--;
      this.basketService.reduceProductFromBasket(product);
    }

    removeAllSameProduct(index?: number) {
      if(typeof index !== 'number'){
        const basket = this.basketService.getBasket();
        index = basket.findIndex(item => item.id === this.product.id);

        this.product.quantity = undefined;
      }
      this.basketService.removeProductByIndex(index);
    }
}