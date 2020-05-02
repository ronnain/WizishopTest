import { Component, OnInit, HostListener } from '@angular/core';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  basketQuantity;
  bigScreen;
  bigScreenLimit = 768;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.bigScreen = screen.width >= this.bigScreenLimit;
    this.getBasketQuantity();

    this.basketService.updateBasketEvent.subscribe((data:string) => {
      this.getBasketQuantity();
    });
  }

  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

  getBasketQuantity() {
    this.basketQuantity = this.basketService.getQuantitySelected();
  }


}
