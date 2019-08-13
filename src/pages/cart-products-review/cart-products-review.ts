import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';
import { ProfilePage } from '../profile/profile';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { HomeScreenPage } from '../home-screen/home-screen';

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

  cartDetails: any = {};
  userDetails: any = {};
  gstNo: string = '';
  streetAddress: string = '';
  city: string = '';
  state: string = '';
  pincode: string = '';
  mark: string = '';
  dest: string = '';
  transporter: string = '';
  notes: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCntr: ToastController,
    private restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider,
    private alertCtrl: AlertController
  ) {
    this.userDetails = this.navParams.get('userDetails');
    this.cartDetails = this.navParams.get('cartDetails');

    console.log('this.userDetails = ' + JSON.stringify(this.userDetails));
    this.gstNo = this.userDetails.gstNo;
    this.streetAddress = this.userDetails.stAddress1;
    this.city = this.userDetails.city;
    this.pincode = this.userDetails.postalCode;
    this.state = this.userDetails.state;
    this.mark = this.userDetails.mark;
    this.dest = this.userDetails.destination;
    this.transporter = this.userDetails.tranNm;


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

  openOrderListingpage() {
    this.presentToast();
    this.gotoOrderListing();
  }

  gotoOrderListing() {

    this.navCtrl.push(OrdersPage);
  }

  gotoProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  placeOrder() {

    console.log('placeOrder CartProductReviewPage');

    if (this.gstNo && null != this.gstNo && undefined != this.gstNo && '' != this.gstNo) {

      let cartDetailsKeys: string[] = Object.keys(this.cartDetails);
      let cartItemListToSend: any[] = [];

      cartDetailsKeys.forEach(
        (cartDetailsKey) => {
          let cartItemsList: any[] = [];
          cartItemsList = this.cartDetails[cartDetailsKey];

          cartItemsList.forEach(
            (cartItem) => {
              cartItemListToSend.push(
                {
                  itemName: cartItem.itemNm,
                  itemPrice: cartItem.itemPrice,
                  itemQty: cartItem.selectedQty,
                  itemMasterDtlsId: cartItem.itemMasterDtlsId,
                  isOfferApld: false,
                  offerId: 0
                }
              );
            }
          );
        }
      );

      let cartData: any = {
        request: [{
          cartNotes: this.notes,
          isOfferApld: false,
          offerApldId: 0,
          alternateCntc: this.userDetails.cntc_num,
          city: this.city,
          country: 'India',
          postalCode: this.pincode,
          stAddress1: this.streetAddress,
          state: this.state,
          mark: this.mark,
          destination: this.dest,
          tranNm: this.transporter,
          isDefaultAddress: true,
          gstNo: this.gstNo,
          shippingDtlsId: this.userDetails.otherAddressId,
          cartItemsList: cartItemListToSend
        }]
      };

      console.log('cartData = ' + JSON.stringify(cartData));

      let placeOrderApiEndpoint: string = ConstantsProvider.API_BASE_URL
        + ConstantsProvider.API_ENDPOINT_ORDER_LIST + ConstantsProvider.URL_SEPARATOR
        + this.userDetails.userTrackId;

      this.restService.postDetails(placeOrderApiEndpoint, cartData)
        .subscribe(
          (response) => {
            console.log('Response = ' + JSON.stringify(response));

            localStorage.removeItem(ConstantsProvider.LOCAL_STRG_CART_DETAILS);

            this.commonUtility.presentToast('Order Placed Successfully', 5000);
            this.navCtrl.setRoot(OrdersPage);
          }
        )
    } else {
      const prompt = this.alertCtrl.create({
        title: 'Update GST No',
        message: "Please Specify your GST No. to place order",
        inputs: [
          {
            type: "text",
            name: 'gstNo'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: data => {
              console.log('Ok clicked. gstNo = ' + data.gstNo);
              let gstNo = data.gstNo;

              if (gstNo && null != gstNo && undefined != gstNo && '' != gstNo) {

                let updateGstApiEndpoint = ConstantsProvider.API_BASE_URL
                  + ConstantsProvider.API_ENDPOINT_GST + ConstantsProvider.URL_SEPARATOR
                  + this.userDetails.userTrackId + ConstantsProvider.URL_SEPARATOR +
                  gstNo;

                this.restService.getDetails(updateGstApiEndpoint)
                  .subscribe(
                    (response) => {
                      console.log('Response = ' + JSON.stringify(response));
                      this.gstNo = gstNo;
                      this.userDetails.gstNo = gstNo;
                      localStorage.setItem(ConstantsProvider.LOCAL_STRG_USR_DTLS,
                        JSON.stringify(this.userDetails));

                      this.commonUtility.presentToast('GST No. Updated Successfully', 5000);
                    }
                  )
              } else {
                this.commonUtility.presentErrorToast('Please Specify valid GST No.');
              }
            }
          }
        ]
      });

      prompt.present();
    }
  }


}
