import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { ProductsService } from '../services/products.service';
import { Basket } from '../modeles/basket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends Basket implements OnInit {

  bigScreen: boolean; // use to display short or large header
  bigScreenLimit = 768;

  subRemoveBasket:Subscription;

  constructor(public basketService: BasketService, private productsService: ProductsService) {
    // call Basket constructor
    super(basketService);
  }

  ngOnInit() {
    this.bigScreen = screen.width >= this.bigScreenLimit;
    this.updateBasket();

    // Subscribe to event when the user update the basket
    this.subRemoveBasket = this.basketService.updateBasketEvent.subscribe((data:string) => {
      this.updateBasket();
    });
  }

  // test if the hearder should change when the window is resized
  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

  // Useful when the product-page component is already loaded and the user wants to load another product in product-page.
  loadProduct(productId: number) {
    this.productsService.loadProductPage.emit(productId.toString());
  }

  // Avoid js multiplication conflict with decimals
  getTotalPrice(quantity: number, price: number) {
    return (quantity *100) * (price *100) / 10000;
  }

  ngOnDestroy() {
    this.subRemoveBasket.unsubscribe();
  }

}
