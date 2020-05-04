import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { Basket } from '../modeles/basket';
import { SUtils } from '../utils';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends Basket implements OnInit  {

  category;
  subRouter;
  subRemoveBasket;

  categoriesFilter;

  // slider properties
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 500,
    minRange: 10,
    translate: (value: number): string => {
      return value + '€';
    }
  };
  objectKeys = Object.keys;

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
    this.setFilters();
  }

  // show only categories filter for "tous" rout
  setFilters() {
    if(this.category === "tous") {
      this.createCategoriesFilter();
    } else {
      this.categoriesFilter = undefined;
    }
    this.setPriceFilter();
  }

  createCategoriesFilter() {
    this.categoriesFilter = {};

    for (const product of this.products) {
      if(!product.categories || !product.categories.length) {
        continue;
      }
      // add the cartegories of the product to categories filter object
      product.categories.forEach(category => {
        this.categoriesFilter[category] = true;
      });
    }
  }

  // warning: the max ceil price is limited by the inited value, here 500
  setPriceFilter() {
    const productPrices: number[] = [];
    this.products.forEach(product => {
      productPrices.push(product.price);
    });
    this.value = Math.floor(Math.min(...productPrices));
    this.highValue = Math.ceil(Math.max(...productPrices));
  }

  filterCategoriesUpdate() {
    const selectedCategories: string[] = this.getCategoriesSelected();
    this.products = this.productsService.getProductsByCategories(selectedCategories);
    this.setPriceFilter();
  }

  getCategoriesSelected(): string [] {
    const selectedCategories = [];
    for (const category in this.categoriesFilter) {
      if(this.categoriesFilter[category]) {
        selectedCategories.push(category)
      }
    }
    return selectedCategories;
  }

  // update product by price
  updatePriceFilter() {
    let selectedCategories: string[] = [this.category];
    if(this.category === "tous") {
      selectedCategories = this.getCategoriesSelected();
    }
    this.products = this.productsService.getProductsByCategoriesPrices(selectedCategories, this.value, this.highValue);
  }

  // Avoid js multiplication conflict with decimals
  getTotalPrice(quantity: number, price: number) {
    return (quantity *100) * (price *100) / 10000;
  }

  ngOnDestroy() {
    this.subRouter.unsubscribe();
    this.subRemoveBasket.unsubscribe();
  }
}
