import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartDetailsPage } from '../cart-details/cart-details';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  selectedValue:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCntr: ToastController) {
    this.selectedValue = 0;
  }

  presentToast() {
    const toast = this.toastCntr.create({
      message: 'Product Added into Cart',
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }
  gotoCarts(){
    this.navCtrl.push(CartDetailsPage);
  }
}
