import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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

  trackId: string = '';
  orderList: any = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider,
    public commonUtility: CommonUtilityProvider,
    public events: Events
  ) {

    this.trackId = localStorage.getItem(ConstantsProvider.LOCAL_STRG_USR_DTLS_ID);
    console.log('loggedInUserDetails ID : ' + this.trackId);

    setTimeout(
      () => {
        if (this.trackId == null || this.trackId == '') {
          events.publish(ConstantsProvider.EVENTS_UNAUTHORISED_USER);
        } else {
          let orderListUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_ORDER_LIST
            + ConstantsProvider.URL_SEPARATOR + this.trackId + ConstantsProvider.URL_SEPARATOR
            + ConstantsProvider.pageNum;

          restService.getDetails(orderListUrl).subscribe(res => {
            this.orderList = res.request;
            console.log('Order List : ' + JSON.stringify(this.orderList));
          });
        }
      }, 1000
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  gotoOrders(order: any) {
    this.navCtrl.push(OrderPage, {
      order: order
    });
  }
}
