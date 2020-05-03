import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BasketDetailComponent } from './basket-detail/basket-detail.component';

const routes: Routes = [
  {path: 'produits/tous', component: ProductsComponent},
  {path: 'produits/:categorie', component: ProductsComponent},
  {path: 'produits/:categorie/:idProduct', component: ProductDetailComponent},
  {path: 'panier', component: BasketDetailComponent},
  {path: '', component: HomeComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
  {path: 'not-found', redirectTo: '', pathMatch: 'full'},
  //{path: 'articles/:articleName', component: ArticleComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
