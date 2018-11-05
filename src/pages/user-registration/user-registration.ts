import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the UserRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-registration',
  templateUrl: 'user-registration.html',
})
export class UserRegistrationPage {
  toggle = "Show";

  userDtls:any={};
  cntc_num: string;
  firstName: string;
  lastName: string;
  cmpnyInfoId: string;
  password: string;
  displayName: string;
  loginId: string;
  data: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restService: RestserviceProvider,
    public commonUtility: CommonUtilityProvider) {
    this.userDtls.cntc_num = navParams.get('cellnumber');

  }

  isActiveToggleTextPassword: Boolean = true;

  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;

    this.toggle = (this.isActiveToggleTextPassword == true) ? "Show" : "Hide";

  } public getType() { return this.isActiveToggleTextPassword ? 'password' : 'text'; }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');
  }
  gotoLogin() {

    this.data = {
      "userDetails": {
        "firstName": this.userDtls.firstName,
        "lastName": this.userDtls.lastName,
        "cntc_num": this.userDtls.cntc_num,
        "cmpnyInfoId": "56",
        "password": this.userDtls.password,
        "displayName": this.userDtls.firstName,
        "loginId": this.userDtls.loginId
      }
    }

    let regUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_REGISTRATION;
    this.restService.postDetails(regUrl, this.data).subscribe(res => {
      if (res.responseMessage.status == '200') {
        this.commonUtility.presentToast('Registration Successfull', 3000);
        this.navCtrl.push(LoginPage);
      } else {
        this.commonUtility.presentToast(res.responseMessage.message, 5000);
      }


    });
  }
}
