import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartProductsReviewPage } from './cart-products-review';

@NgModule({
  declarations: [
    CartProductsReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CartProductsReviewPage),
  ],
})
export class CartProductsReviewPageModule {}
