import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CartProductsReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-products-review',
  templateUrl: 'cart-products-review.html',
})
export class CartProductsReviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCntr:ToastController) {
  }
  presentToast() {
    const toast = this.toastCntr.create({
      message: 'Your Order Has been placed Successfully.',
      duration: 5000
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartProductsReviewPage');
  }

  openOrderListingpage(){
    this.presentToast();
  }

}
