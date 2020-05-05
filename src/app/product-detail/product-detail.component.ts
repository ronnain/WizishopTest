import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductDetail } from '../interfaces';
import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { Basket } from '../modeles/basket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends Basket implements OnInit {

  idProduct;
  product: Product;
  productDetail: ProductDetail;

  subLoadProductPage: Subscription;

  constructor(private _Activatedroute:ActivatedRoute, private productsService: ProductsService, public basketService: BasketService) {
    // call Basket constructor
    super(basketService);
  }

  ngOnInit(): void {
    this.loadProduct();

    //Use when the user wants to load another product and the component has already been loaded
    this.subLoadProductPage = this.productsService.loadProductPage.subscribe((productId:string) => {
      const idProduct = parseInt(productId, 10);
      if(idProduct !== this.idProduct){
        this.loadProduct(idProduct);
      }
    });
  }

  // get all the information to display the product
  loadProduct(productId?:number) {
    this.idProduct = productId ? productId : parseInt(this._Activatedroute.snapshot.paramMap.get("idProduct"), 10);
    this.product = this.productsService.getProductById(this.idProduct);
    this.productDetail = this.productsService.getProductDetail(this.idProduct);
  }

  // Avoid js multiplication conflict with decimals
  getTotalPrice(quantity: number, price: number) {
    return (quantity *100) * (price *100) / 10000;
  }

  ngOnDestroy() {
    this.subLoadProductPage.unsubscribe();
  }
}
