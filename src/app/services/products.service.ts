import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product, ProductDetail } from '../interfaces';
import { PRODUCTS, PROUCTS_DETAILS } from '../mock/products';
import { BasketService } from './basket.service';
import { SUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products : Product[];

  @Output()
  loadProductPage = new EventEmitter<string>();

  constructor(private basketService: BasketService) { }

  // To do: observables
  getAllProducts(): Product[] {
    this.products = PRODUCTS;
    this.getBasketUpdate();
    return this.products;
  }

  // To do: observables
  getProductById(id: number): Product {
    // Call getAllProcts, will update the products quantity with the current basket
    this.getAllProducts();
    return SUtils.findElemInList('id', id, this.products);
  }

  getProductDetail(idProduct: number): ProductDetail {
    return SUtils.findElemInList('idProduct', idProduct, PROUCTS_DETAILS);
  }

  getBasketUpdate() {
    const basket = this.basketService.getBasket();

    // retrieve the basket from previous sessions
    if(basket && basket.length) {
      for (const item of basket) {
        const foundProduct: Product = SUtils.findElemInList('id', item.id, this.products);
        foundProduct.quantity = item.quantity;
      }
    }
  }
}
