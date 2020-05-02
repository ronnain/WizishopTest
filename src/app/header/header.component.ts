import { Component, OnInit, HostListener } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Product } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  basketQuantity: number;
  basket: Product[];

  bigScreen;
  bigScreenLimit = 768;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.bigScreen = screen.width >= this.bigScreenLimit;
    this.getBasketQuantity();
    this.getBasket();

    // Subscribe to event when the user update the basket
    this.basketService.updateBasketEvent.subscribe((data:string) => {
      this.getBasketQuantity();
      this.getBasket();
    });
  }

  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

  getBasketQuantity() {
    this.basketQuantity = this.basketService.getQuantitySelected();
  }

  getBasket() {
    this.basket = this.basketService.getBasket();
  }

  getTotal(): number {
    return this.basketService.getTotalBasket();
  }

}
