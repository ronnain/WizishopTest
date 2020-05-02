import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { Product, ProductDetail } from '../interfaces';
import { BasketUpdate } from '../modeles/modeles';

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
    this.updateBasket();
    // Subscribe to event when the user update the basket
    this.basketService.updateBasketEvent.subscribe((data:string) => {
      this.getBasketQuantity();
      this.getTotal();
    });
  }

  updateBasket() {
    this.basket = this.basketService.getBasket();
    this.getBasketQuantity();
    this.getBasket();
    this.getTotal();
  }

  getBasketQuantity() {
    this.basketQuantity = this.basketService.getQuantitySelected();
  }

  getBasket() {
    this.basket = this.basketService.getBasket();
  }

  getTotal() {
    this.basketTotal = this.basketService.getTotalBasket();
  }
}
