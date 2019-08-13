import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UserRegistrationPage } from '../user-registration/user-registration';
import { LoginPage } from '../login/login';

/**
 * Generated class for the VerifyOtpForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-otp-forgotpass',
  templateUrl: 'verify-otp-forgotpass.html',
})
export class VerifyOtpForgotpassPage {

  datatoResend: any = {};
  data: any = {};
  otp: number;
  cellnumber: string;
  deviceInfo: string;
  newPass: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider,
    public commonUtility: CommonUtilityProvider
  ) {

    this.cellnumber = navParams.get('cellnumber');
    this.deviceInfo = navParams.get('deviceInfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyOtpForgotPassPage');
  }


  verifyOtpAndChangePass() {

    this.data = {
      cellNumber: this.cellnumber,
      otp: this.otp,
      newPassword: this.newPass
    };

    let resetpasswordUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_RESETPASS;

    this.restService.postDetails(resetpasswordUrl, this.data).subscribe(res => {

      if (res.responseMessage.status == '200') {
        this.commonUtility.presentToast('Password Changed Succeffully', 3000);

        this.navCtrl.push(LoginPage);
      } else {
        this.commonUtility.presentToast(res.responseMessage.message, 5000);
      }
    });
  }

  resendOtp() {
    this.datatoResend = {
      "request":
      {
        "cellnumber": this.cellnumber,
        "deviceInfo": this.deviceInfo
      }
    }

    let sendOtpUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_SEND_OTP;

    this.restService.postDetails(sendOtpUrl, this.datatoResend).subscribe(res => {

      if (res.responseMessage.status == '200') {

        this.commonUtility.presentToast('OTP Sent in message', 5000);

      } else {
        this.commonUtility.presentToast(res.responseMessage.message, 5000);
      }
    });
  }

}
