import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  // userDetails:any={};
  trackId:string = '9cb54a49-75d1-11e7-8dd0-525400f54f71';
  orderList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restService:RestserviceProvider,
    public commonUtility: CommonUtilityProvider) {
  //  this.userDetails = localStorage.getItem('userDetails');
  //  console.log('loggedInUserDetails : '+JSON.stringify(this.userDetails));
      let orderListUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_ORDER_LIST + ConstantsProvider.URL_SEPARATOR 
      + this.trackId + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.pageNum;

      restService.getDetails(orderListUrl).subscribe(res=>{
        this.orderList = res.request;
        console.log('Order List : '+JSON.stringify(this.orderList));
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  gotoOrders(){
    this.navCtrl.push(OrderPage);
  }
}
