import { Injectable } from '@angular/core';
import { Product, ProductDetail } from '../interfaces';
import { PRODUCTS, PROUCTS_DETAILS } from '../mock/products';
import { BasketService } from './basket.service';
import { SUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products : Product[];

  constructor(private basketService: BasketService) { }

  // To do: observables
  getAllProducts(): Product[] {
    this.products = PRODUCTS;
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

  // To do: observables
  getProductById(id: number): Product {
    return SUtils.findElemInList('id', id, PRODUCTS);
  }

  getProductDetail(idProduct: number): ProductDetail {
    return SUtils.findElemInList('idProduct', idProduct, PROUCTS_DETAILS);
  }


}
