import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces';
import { BasketService } from '../services/basket.service';
import { BasketUpdate } from '../modeles/modeles';
import { SUtils } from '../utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BasketUpdate implements OnInit  {

  constructor(private productsService: ProductsService, public basketService: BasketService) {
    super(basketService);
  }

  ngOnInit(): void {
    this.products = this.productsService.getAllProducts();

    this.basketService.removeProductBasketEvent.subscribe((productId:string) => {
      const foundProduct = SUtils.findElemInList('id', parseInt(productId,10), this.products);
      foundProduct.quantity = undefined;
    });
  }
}
