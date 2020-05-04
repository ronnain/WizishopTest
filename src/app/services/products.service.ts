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
    // make a copy of PRODUCTS array with nested object
    this.products = JSON.parse(JSON.stringify(PRODUCTS));
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

  getProductsByCategories(categories: string[]): Product[] {
    const allProducts: Product[] = this.getAllProducts();
    const searchProducts: Product[] = [];
    for (const product of allProducts) {
      if(!product.categories) {
        continue;
      }
      for(const category of product.categories) {
        if (categories.indexOf(category) !== -1) {
          searchProducts.push(product);
        }
      }
    }
    return searchProducts;
  }

  getProductsByCategoriesPrices(categories: string[], minPrice: number, maxPrice: number): Product[]{
    const searchProducts: Product[] = this.getProductsByCategories(categories);
    return searchProducts.filter(product =>
      product.price >= minPrice &&  product.price <= maxPrice);
  }
}
