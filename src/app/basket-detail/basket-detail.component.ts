import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { Product, ProductDetail } from '../interfaces';
import { BasketUpdate } from '../modeles/modeles';
import { SUtils } from '../utils';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styleUrls: ['./basket-detail.component.css']
})
export class BasketDetailComponent extends BasketUpdate implements OnInit {


  basketQuantity;
  basketTotal;
  basket: Product[];

  constructor(public basketService: BasketService) {
    super(basketService);
  }

  ngOnInit(): void {
    this.getBasket();

    // Subscribe to event when the user update the basket
    this.basketService.removeProductBasketEvent.subscribe((data:string) => {
      this.getBasket();
    });
  }

  // Polymorphisme, remove product from products array when the quantity is < 1
  removeProduct(index?: number) {
    const product = (typeof index === 'number') ? this.products[index]: this.product;
    product.quantity--;
    this.basketService.reduceProductFromBasket(product);

    // remove the products
    if(product.quantity < 1) {
      this.products.splice(index, 1);
    }
  }

  getBasket() {
    this.products = this.basketService.getBasket();
  }

  buy() {
    alert("Merci pour votre achat !");
  }
}
