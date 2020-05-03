import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Product } from '../interfaces';
import { ProductsService } from '../services/products.service';
import { BasketUpdate } from '../modeles/modeles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BasketUpdate implements OnInit {

  bigScreen;
  bigScreenLimit = 768;

  constructor(public basketService: BasketService, private productsService: ProductsService) {
    super(basketService);
  }

  ngOnInit() {
    this.bigScreen = screen.width >= this.bigScreenLimit;
    this.updateBasket();

    // Subscribe to event when the user update the basket
    this.basketService.updateBasketEvent.subscribe((data:string) => {
      this.updateBasket();
    });
  }

  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

  loadProduct(productId: number) {
    this.productsService.loadProductPage.emit(productId.toString());
  }

}
