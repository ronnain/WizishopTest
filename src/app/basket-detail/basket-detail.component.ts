import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { Product, ProductDetail } from '../interfaces';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styleUrls: ['./basket-detail.component.css']
})
export class BasketDetailComponent implements OnInit {


  constructor(private productsService: ProductsService, private basketService: BasketService) { }

  ngOnInit(): void {

  }



}
