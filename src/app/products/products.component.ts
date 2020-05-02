import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.products = this.productsService.getAllProducts();
    console.log(this.products)
  }

  addProduct(index) {
    const product = this.products[index];
    if(!product.quantity) {
      product.quantity = 0;
    }
    product.quantity++;
    this.basketService.addProductToBasket(product);
  }

  removeProduct(index) {
    const product = this.products[index];
    product.quantity--;
    this.basketService.reduceProductFromBasket(product);
  }
}
