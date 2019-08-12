import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartDetailsPage } from '../cart-details/cart-details';
import { AddProductPage } from '../add-product/add-product';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from "../../providers/common-utility/common-utility";

/**
 * Generated class for the HomeScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html',
})
export class HomeScreenPage {

  homescreenDetails: Array<HomescreenDetails> = [];
  categoryDetailsArray: Array<CategoryDetails> = [];
  subCategoryDetails: Array<SubCategoryDetails> = [];
  categoryName: string;
  categoryId: number;
  showToast: boolean = false;
  toastMessage: string = '';
  cartItemSize: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider
  ) {

    // localStorage.clear();
    console.log('this.cartItemSize = ' + this.cartItemSize);

    let homeScreenUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_HOMESCREEN;
    this.restService.getDetails(homeScreenUrl).subscribe((res) => {

      this.homescreenDetails = res.categoryAndSubCatDetails;
      console.log('Response : ' + JSON.stringify(this.homescreenDetails));


      for (let i = 0; i < this.homescreenDetails.length; i++) {
        this.subCategoryDetails = this.homescreenDetails[0].subCategoryDetails;
        this.categoryDetailsArray.push(this.homescreenDetails[i].categoryDetails);
        this.categoryId = this.subCategoryDetails[0].parantId;
      }
      console.log('HomeScreen Response : ' + JSON.stringify(this.categoryDetailsArray));

      this.showToast = this.navParams.get('showToast');
      this.toastMessage = this.navParams.get('toastMessage');

      if (this.showToast) {
        this.commonUtility.presentToast(this.toastMessage, 5000);
      }
    });

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HomeScreenPage');
    this.cartItemSize = this.commonUtility.getCartItemSize();
    console.log('this.cartItemSize = ' + this.cartItemSize);
  }

  changeSubCategory(categoryId) {
    console.log('Categry Id : ' + categoryId);
    this.subCategoryDetails = [];
    for (let i = 0; i < this.homescreenDetails.length; i++) {
      if (this.homescreenDetails[i].categoryDetails.id == categoryId) {
        this.categoryName = this.homescreenDetails[i].categoryDetails.name;
      }
      console.log('Subcategory Response : ' + JSON.stringify(this.homescreenDetails[i].subCategoryDetails));
      for (let j = 0; j < this.homescreenDetails[i].subCategoryDetails.length; j++) {
        if (this.homescreenDetails[i].subCategoryDetails[j].parantId == categoryId) {
          this.subCategoryDetails.push(this.homescreenDetails[i].subCategoryDetails[j]);
          console.log('Category Response Subcategoy :' + [i] + '- ' + JSON.stringify(this.homescreenDetails[i].subCategoryDetails[j].name));
        }
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeScreenPage');
  }

  gotoCarts() {
    this.navCtrl.push(CartDetailsPage);
  }

  opneProductDetails(subCategory: any) {
    console.log('opneProductDetails() called with Data = ' + JSON.stringify(subCategory));
    console.log('subCategory.id = ' + subCategory.id + ', subCategory.parantId = ' + subCategory.parantId);
    this.navCtrl.push(AddProductPage, {
      subcategoryid: subCategory.id,
      categoryid: subCategory.parantId,
      name: subCategory.name
    });
  }

}
