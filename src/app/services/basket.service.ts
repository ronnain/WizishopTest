import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from '../interfaces';
import { SUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  // Event when the basket is updated
  @Output() updateBasketEvent = new EventEmitter<string>();
  // Event when a product is removed from the basket
  @Output() removeProductBasketEvent = new EventEmitter<string>();

  constructor() { }

  /**
   * Get basket from local storage
   */
  getBasket(): Product[] {
    return JSON.parse(localStorage.getItem('basket'));
  }

  /**
   * Return the quantity of products in the basket
   */
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

  /**
   * Return the total amount of products in the basket
   */
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

  /**
   * Add a product in the basket (incrementation of 1)
   */
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

  /**
   * Remove a product from the basket (decrement of 1)
   */
  reduceProductFromBasket(product: Product) {
    let basket = this.getBasket();
    if(!basket) {
        basket = [];
    }

    // remove the product from the basket
    if (basket.length && product.quantity < 1) {
        this.removeProductById(product.id, basket);
    } else {
        // decrease the quantity
        const foundProduct = SUtils.findElemInList('id', product.id, basket);
        if (foundProduct) {
            foundProduct.quantity--;
        }
    }
    this.updateBasket(basket);
  }

  /**
   * Remove entirely a product from the basket
   * @param productId
   * @param basket
   */
  removeProductById(productId: number, basket: Product[]) {
    const indexProduct = basket.findIndex(item => item.id === productId);
    basket.splice(indexProduct, 1);
    this.updateBasket(basket);
    this.removeProductBasketEvent.emit(productId.toString());
  }

  /**
   * Remove entirely a product from the basket
   * @param indexProduct index of the product in the basket
   */
  removeProductByIndex(indexProduct: number) {
    // find the index of the product in the basket
    const basket = this.getBasket();
    const productId = basket[indexProduct].id;

    basket[indexProduct].quantity = 0;
    this.removeProductById(productId, basket);
  }

  /**
   * Remove all the products from the basket
   */
  removeAllProducts(){
    localStorage.setItem('basket', JSON.stringify([]));
    this.updateBasketEvent.emit();
  }

  /**
   * Emit an event that, the basket has been updated
   * @param basket
   */
  updateBasket(basket: Product[]) {
    localStorage.setItem('basket', JSON.stringify(basket));
    this.updateBasketEvent.emit();
  }
}
