import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartDetailsPage } from '../cart-details/cart-details';
import { CommonUtilityProvider } from "../../providers/common-utility/common-utility";
import { RestserviceProvider } from "../../providers/restservice/restservice";
import { ConstantsProvider } from "../../providers/constants/constants";
import { ItemDtls } from "./domain-products";
import { HomeScreenPage } from "../home-screen/home-screen";

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

  selectedValue: any;
  subcategoryid: any;
  categoryid: any;
  name: string;
  productDetailsList: ItemDtls[] = [];
  cartItemSize = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCntr: ToastController,
    private restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider) {

    this.selectedValue = 0;
    this.subcategoryid = this.navParams.get('subcategoryid');
    this.categoryid = this.navParams.get('categoryid');
    this.name = this.navParams.get('name');

    this.cartItemSize = this.commonUtility.getCartItemSize();
    console.log('this.subcategoryid = ' + this.subcategoryid
      + ', this.categoryid = ' + this.categoryid);

    const productDetailsListUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_SUBCATEGORY_PRODUCT +
      '?' + ConstantsProvider.REQ_PARAM_CMPNY_ID + '&' + ConstantsProvider.REQ_PARAM_CATEGORY_ID + this.categoryid
      + '&' + ConstantsProvider.REQ_PARAM_SUBCATEGORY_ID + this.subcategoryid;
    console.log('productDetailsListUrl = ' + productDetailsListUrl);

    this.restService.getDetails(productDetailsListUrl)
      .subscribe(
      (response) => {
        console.log('response = ' + JSON.stringify(response));
        this.productDetailsList = response.resposne;
        console.log('productDetailsList = ' + JSON.stringify(this.productDetailsList));
        let productDetailsListLength = this.productDetailsList.length;

        for (let i = 0; i < productDetailsListLength; i++) {
          let element = this.productDetailsList[i];
          let masterCartonRange: any = element.masterCartonQtyRange.split('-');
          let masterCartonStartRange: any = masterCartonRange[0];
          let masterCartonEndRange: any = masterCartonRange[1];
          let masterCartonIncVal: any = element.masterCartonQtyIncVal;

          let itemQtyArray: any = [];
          let itemQtyVal = Number.parseInt(masterCartonStartRange.toString());

          while (itemQtyVal < masterCartonEndRange) {
            itemQtyVal = itemQtyVal + Number.parseInt(masterCartonIncVal.toString());
            if (!(itemQtyVal > masterCartonEndRange))
              itemQtyArray.push(itemQtyVal);
          }

          // element['itemQtyArray'] = itemQtyArray;
          // console.log('element = ' + JSON.stringify(element));
          this.productDetailsList[i]['itemQtyArray'] = itemQtyArray;
          this.productDetailsList[i]['selectedQty'] = '';

          console.log('itemNm = ' + element.itemNm + '-' + element.uom
            + ', masterCartonQtyRange = ' + element.masterCartonQtyRange +
            ', masterCartonStartRange = ' + masterCartonStartRange + ', masterCartonEndRange = ' + masterCartonEndRange
            + 'itemQtyArray = ' + JSON.stringify(this.productDetailsList[i].itemQtyArray));
        }
      }
      )
  }


  addItemToCart() {

    let cartDetails = this.commonUtility.getCartDetails();

    for (let i = 0; i < this.productDetailsList.length; i++) {
      let productDetails = this.productDetailsList[i];
      console.log('prodcut Id = ' + productDetails.itemMasterDtlsId + 'prodcut name = ' + productDetails.itemNm + '-' + productDetails.uom
        + ', selectedQty = ' + productDetails.selectedQty)

      if (null != productDetails.selectedQty && productDetails.selectedQty != undefined &&
        productDetails.selectedQty != '' && productDetails.selectedQty != 'undefined') {
        let searchKey = this.subcategoryid;
        let searchItemList: any = cartDetails[searchKey];
        let addItemInList: boolean = true;
        if (searchItemList != null && searchItemList != undefined) {
          console.log('Search Item = ' + JSON.stringify(searchItemList));
          let searchItemListLength = searchItemList.length;

          for (let j = 0; j < searchItemListLength; j++) {
            if (searchItemList[j].itemMasterDtlsId == productDetails.itemMasterDtlsId) {
              // let prevItemQty = Number.parseInt(searchItemList[j].selectedQty.toString());
              // searchItemList[j].selectedQty = (Number.parseInt(productDetails.selectedQty.toString()) + prevItemQty).toString();
              searchItemList[j].selectedQty = productDetails.selectedQty;
              addItemInList = false;
            }
          }
        }

        if (addItemInList) {
          if (searchItemList == null || searchItemList == undefined)
            searchItemList = [];

          searchItemList.push(productDetails);
        }
        
        cartDetails[searchKey] = searchItemList;
      }
    }

    localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
    console.log('cartDetails = ' + JSON.stringify(cartDetails));

    this.navCtrl.setRoot(HomeScreenPage, {
      showToast: true,
      toastMessage: 'Item Added Successfully In Cart'
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }


  gotoCarts() {
    this.navCtrl.push(CartDetailsPage);
  }
}
