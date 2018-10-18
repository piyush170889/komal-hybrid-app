import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Observable} from 'rxjs/Rx';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // console.log('Api Call');
    // this.http.get('http://67.211.220.180:8080/mediaadvertisement/v1/ext/hoarding').toPromise().then(res=>console.log(JSON.stringify(res))).then(res=>{console.log('Completed')}
    // ).catch(err=>{
    //   console.log('Error Occured');
    // })
    // console.log('is after');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }
}
