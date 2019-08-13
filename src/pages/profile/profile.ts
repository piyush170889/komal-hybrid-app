import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toggle } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ChangepassPage } from '../changepass/changepass';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userDetails: any = {};
  isDisable = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private restService: RestserviceProvider
  ) {

    let userProfileDetailsApiEndpoint: string = ConstantsProvider.API_BASE_URL +
      ConstantsProvider.API_ENDPOINT_USERPROFILE + ConstantsProvider.URL_SEPARATOR
      + this.commonUtility.getUserDetailsId();

    this.restService.getDetails(userProfileDetailsApiEndpoint)
      .subscribe(
        (response) => {
          console.log('Response = ' + response.userDetails);
          this.userDetails = response.userDetails;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  toggle() {

    console.log('toggle ProfilePage');

    this.isDisable = this.isDisable == false ? true : false;
    return this.isDisable;
  }

  updateProfileInfo() {

    console.log('updateProfileInfo ProfilePage');

    let profileRequestData: any = {
      request: {
        firstName: this.userDetails.firstName,
        email: this.userDetails.loginId,
        lastName: this.userDetails.lastName,
        displayName: this.userDetails.displayName,
        pincode: this.userDetails.postalCode,
        address: this.userDetails.stAddress1,
        city: this.userDetails.city,
        state: this.userDetails.state,
        mark: this.userDetails.mark,
        destination: this.userDetails.destination,
        tranNm: this.userDetails.tranNm,
        gstNo: this.userDetails.gstNo
      }
    };

    let profileUpdateApiEndPoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_USER_DTLS
      + ConstantsProvider.URL_SEPARATOR + this.userDetails.userTrackId;

    this.restService.putDetails(profileUpdateApiEndPoint, profileRequestData)
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response));

          this.commonUtility.presentToast('Successfully Updated Profile Info', 5000);

          localStorage.setItem(ConstantsProvider.LOCAL_STRG_USR_DTLS, JSON.stringify(this.userDetails));

          this.toggle();
        }
      );

  }

  changePassword() {

    console.log('changePassword ProfilePage');

    this.navCtrl.push(ChangepassPage);
  }
}


