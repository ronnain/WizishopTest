import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Product } from '../interfaces';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  basketQuantity: number;
  basketTotal: number;
  basket: Product[];

  bigScreen;
  bigScreenLimit = 768;

  constructor(private basketService: BasketService, private productsService: ProductsService) { }

  ngOnInit() {
    this.bigScreen = screen.width >= this.bigScreenLimit;
    this.getBasketQuantity();
    this.getBasket();
    this.getTotal();

    // Subscribe to event when the user update the basket
    this.basketService.updateBasketEvent.subscribe((data:string) => {
      this.getBasketQuantity();
      this.getBasket();
      this.getTotal();
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

  getTotal() {
    this.basketTotal =  this.basketService.getTotalBasket();
  }

  loadProduct(productId: number) {
    this.productsService.loadProductPage.emit(productId.toString());
  }

}
