import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { Basket } from '../modeles/basket';
import { SUtils } from '../utils';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends Basket implements OnInit  {

  category;
  subRouter;
  subRemoveBasket;

  constructor(private _Activatedroute:ActivatedRoute, private router: Router, private productsService: ProductsService, public basketService: BasketService) {
    super(basketService);
  }

  ngOnInit(): void {
    this.loadProducts();

    this.subRemoveBasket = this.basketService.removeProductBasketEvent.subscribe((productId:string) => {
      const foundProduct = SUtils.findElemInList('id', parseInt(productId,10), this.products);
      foundProduct.quantity = undefined;
    });

    // detect url change
    this.subRouter = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.category = this._Activatedroute.snapshot.paramMap.get("category");

    if(this.category === "tous") {
      this.products = this.productsService.getAllProducts();
    } else {
      this.products = this.productsService.getProductsByCategories([this.category]);
    }
  }

  ngOnDestroy() {
    this.subRouter.unsubscribe();
    this.subRemoveBasket.unsubscribe();
  }
}
