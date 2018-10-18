import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProductsReviewPage } from '../cart-products-review/cart-products-review';

/**
 * Generated class for the CartDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-details',
  templateUrl: 'cart-details.html',
})
export class CartDetailsPage {

  selectedValue=60;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartDetailsPage');
  }

  openReviewProductPage(){
    this.navCtrl.push(CartProductsReviewPage);
  }
}
