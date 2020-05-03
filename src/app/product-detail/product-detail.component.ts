import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductDetail } from '../interfaces';
import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { BasketUpdate } from '../modeles/modeles';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BasketUpdate implements OnInit {

  idProduct;
  product: Product;
  productDetail: ProductDetail;

  constructor(private _Activatedroute:ActivatedRoute, private productsService: ProductsService, public basketService: BasketService) {
    super(basketService);
  }

  ngOnInit(): void {
    console.log("init")
    this.loadProduct();
    //When the user load a product and the component has already loaded
    this.productsService.loadProductPage.subscribe((productId:string) => {
      console.log("event")
      const idProduct = parseInt(productId, 10);
      if(idProduct !== this.idProduct){
        this.loadProduct(idProduct);
      }
    });
  }

  loadProduct(productId?:number) {
    this.idProduct = productId ? productId : parseInt(this._Activatedroute.snapshot.paramMap.get("idProduct"), 10);
    console.log("laodProduct", this.idProduct)
    this.product = this.productsService.getProductById(this.idProduct);
    this.productDetail = this.productsService.getProductDetail(this.idProduct);
  }

}
