import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  order: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.order = this.navParams.get('order');
    console.log('this.order = ' + JSON.stringify(this.order));
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad OrderPage');
  }
}
