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

  // Event when the user wants to load a product in product-detail
  @Output() loadProductPage = new EventEmitter<string>();

  constructor(private basketService: BasketService) { }

  /**
   * Retrieve all the products and merge with the current basket
   * To do : when linked to a backend use observable
   */
  getAllProducts(): Product[] {
    // make a copy of PRODUCTS array with nested object
    this.products = JSON.parse(JSON.stringify(PRODUCTS));
    this.getBasketUpdate();
    return this.products;
  }

  /**
   * Retrieve a product and merge with the current basket
   * To do : when linked to a backend use observable
   */
  getProductById(id: number): Product {
    // Call getAllProcts, will update the products quantity with the current basket
    this.getAllProducts();
    return SUtils.findElemInList('id', id, this.products);
  }

  /**
   * Get the detail of a product
   * To do : when linked to a backend use observable
   * @param idProduct
   */
  getProductDetail(idProduct: number): ProductDetail {
    return SUtils.findElemInList('idProduct', idProduct, PROUCTS_DETAILS);
  }

  /**
   * Update the products with the current basket
   * @param idProduct
   */
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

  /**
   * Retrieve all the products that merge the categories filter and merge with the current basket
   * To do : when linked to a backend use observable
   * @param categories
   */
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

  /**
   * Retrieve all the products that merge the categories filter and price filter. Merge with the current basket
   * To do : when linked to a backend use observable
   * @param categories
   */
  getProductsByCategoriesPrices(categories: string[], minPrice: number, maxPrice: number): Product[]{
    const searchProducts: Product[] = this.getProductsByCategories(categories);
    return searchProducts.filter(product =>
      product.price >= minPrice &&  product.price <= maxPrice);
  }
}
