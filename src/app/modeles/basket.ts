import { BasketService } from '../services/basket.service';
import { Product } from '../interfaces';


export class Basket {

    products: Product[];
    product: Product;

    basketQuantity: number;
    basketTotal: number;

    constructor(public basketService: BasketService) {
    }

    /**
     * Add a product in the basket
     * @param index optional, index of the product in products array
     */
    addProduct(index?: number) {
      const product = (typeof index === 'number') ? this.products[index]: this.product;

      if(!product.quantity) {
        product.quantity = 0;
      }
      product.quantity++;
      this.basketService.addProductToBasket(product);
    }

    /**
     * Reduce the quantity of the product in the basket
     * @param index optional, index of the product in products array
     */
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


    /**
     * Get all the information from the basket
     */
    updateBasket() {
      this.getBasketQuantity();
      this.getTotal();
      this.getBasket();
    }

    getBasketQuantity() {
      this.basketQuantity = this.basketService.getQuantitySelected();
    }

    getTotal() {
      this.basketTotal =  this.basketService.getTotalBasket();
    }

    getBasket() {
      this.products = this.basketService.getBasket();
    }
}