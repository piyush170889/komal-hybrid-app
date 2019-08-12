import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CartProductsReviewPage } from '../cart-products-review/cart-products-review';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';
import { HomeScreenPage } from '../home-screen/home-screen';
import { LoginPage } from '../login/login';

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

  selectedValue = 60;
  cartDetails: any = {};
  cartDetailsListKeys: string[] = [];
  cartItemSize: number = 0;
  JSON: any;
  userDetails: any = null;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private alertCtrl: AlertController
  ) {

    this.userDetails = this.commonUtility.getUserDetails();
    console.log('this.userDetails = ' + this.userDetails);

    this.userDetails = this.userDetails != null
      && undefined != this.userDetails ? JSON.parse(this.userDetails) : null;

    if (null != this.userDetails)
      console.log('userDetails = ' + JSON.stringify(this.userDetails));

    this.JSON = JSON;
    this.cartDetails = this.commonUtility.getCartDetails();
    this.refreshCartItemSize();
    console.log('cartDetails = ' + JSON.stringify(this.cartDetails)
      + ', this.cartItemSize = ' + this.cartItemSize);

    this.cartDetailsListKeys = Object.keys(this.cartDetails);
    console.log('cartDetailsListKeys = ' + this.cartDetailsListKeys);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartDetailsPage');
  }

  openReviewProductPage() {

    console.log('openReviewProductPage CartDetailsPage');
    this.navCtrl.push(CartProductsReviewPage, {
      cartDetails : this.cartDetails,
      userDetails : this.userDetails
    });
  }

  removeSubCatAllProducts(cartDetailKey) {

    console.log('removeSubCatAllProducts called. cartDetailKey = ' + cartDetailKey);

    const prompt = this.alertCtrl.create({
      title: 'Remove Items',
      message: "Do You Really Want To Remove This Item?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log('Yes clicked');

            delete this.cartDetails[cartDetailKey];

            console.log('Deleted cartDetails');
            this.commonUtility.setCartDetails(this.cartDetails);

            this.refreshCartItemSize();
          }
        }
      ]
    });
    prompt.present();
  }

  refreshCartItemSize() {
    this.cartItemSize = this.commonUtility.getCartItemSize();
  }

  showNoCartItemMssg() {

    console.log('showNoCartItemMssg CartDetailsPage');
    this.commonUtility.presentErrorToast('No Items Present In Cart');
  }

  clearAllCartItems() {

    console.log('clearAllCartItems  CartDetailsPage');

    const prompt = this.alertCtrl.create({
      title: 'Clear Cart',
      message: "Do You Really Want To Remove All Items In The Cart?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log('Yes clicked');

            localStorage.removeItem(ConstantsProvider.LOCAL_STRG_CART_DETAILS);
            this.cartDetails = [];
            this.refreshCartItemSize();
          }
        }
      ]
    });
    prompt.present();

  }

  removeAnItemFromCart(cartDetailKey, cartDetailsObj) {

    console.log('removeAnItemFromCart CartDetailsPage. cartDetailKey = '
      + cartDetailKey + ', cartDetailsObj = ' + JSON.stringify(cartDetailsObj));

    let cartItemsList: any[] = this.cartDetails[cartDetailKey];
    cartItemsList.forEach(
      (cartItem) => {

        if (cartItem.itemMasterDtlsId == cartDetailsObj.itemMasterDtlsId) {
          cartItemsList.splice(cartItem, 1);
        }
      }
    );

    this.cartDetails[cartDetailKey] = cartItemsList;

    this.commonUtility.setCartDetails(this.cartDetails);

    this.commonUtility.presentToast('SuccessFully Removed Cart Item', 5000);

    this.refreshCartItemSize();
  }

  goToHomeScreen() {

    console.log('goToHomeScreen CartDetailsPage');

    this.navCtrl.setRoot(HomeScreenPage);
  }

  goToLoginScreen() {

    console.log('goToLoginScreen CartDetailsPage');

    this.navCtrl.setRoot(LoginPage);
  }

}
