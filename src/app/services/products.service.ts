import { Injectable } from '@angular/core';
import { Product } from '../interfaces';
import { PRODUCTS } from '../mock/products';
import { BasketService } from './basket.service';
import { SUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products : Product[] = PRODUCTS;

  constructor(private basketService: BasketService) { }

  getAllProducts(): Product[] {
    const basket = this.basketService.getBasket();

    // retrieve the basket from previous sessions
    if(basket && basket.length) {
      for (const item of basket) {
        const foundProduct: Product = SUtils.findElemInList('id', item.id, this.products);
        foundProduct.quantity = item.quantity;
      }
    }
    return this.products;
  }


}
