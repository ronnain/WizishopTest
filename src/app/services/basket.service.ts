import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from '../interfaces';
import { SUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  @Output() updateBasketEvent = new EventEmitter<string>();

  constructor() { }

  getBasket(): Product[] {
    return JSON.parse(localStorage.getItem('basket'));
  }

  getQuantitySelected(): number {
        const basket = this.getBasket();
        if(!basket || !basket.length) {
            return;
        }
        let quantity = 0;
        basket.forEach(item => {
            quantity += item.quantity;
        });
        return quantity;
  }

  getTotalBasket(): number {
    const basket = this.getBasket();
    if(!basket || !basket.length) {
        return;
    }
    let total = 0;
    basket.forEach(item => {
      total += item.quantity * item.price;
    });
    return total;
}

  addProductToBasket(product: Product) {
    let basket = this.getBasket();
    if(!basket) {
        basket = [];
    }

    const indexProduct = basket.findIndex(item => item.id === product.id);
    // Increase the quantity
    if (indexProduct !== -1) {
        basket[indexProduct].quantity ++;
    } else {
        // add the product to the basket
        basket.push(product);
    }

    this.updateBasket(basket);
  }

  reduceProductFromBasket(product: Product) {
    let basket = this.getBasket();
    if(!basket) {
        basket = [];
    }

    // remove the product from the basket
    if (basket.length && product.quantity < 1) {
        const indexProduct = basket.findIndex(item => item.id === product.id);
        basket.splice(indexProduct, 1);
    } else {
        // decrease the quantity
        const foundProduct = SUtils.findElemInList('id', product.id, basket);
        if (foundProduct) {
            foundProduct.quantity--;
        }
    }
    this.updateBasket(basket);
  }

  updateBasket(basket: Product[]) {
    localStorage.setItem('basket', JSON.stringify(basket));
    this.updateBasketEvent.emit();
  }

}
