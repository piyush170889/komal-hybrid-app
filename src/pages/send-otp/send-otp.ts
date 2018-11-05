import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VerifyOtpPage } from '../verify-otp/verify-otp';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';

/**
 * Generated class for the SendOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-otp',
  templateUrl: 'send-otp.html',
})
export class SendOtpPage {

  data:any ={};
  cellnumber:string;
  deviceInfo:string ="vivov7";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public commonUtility : CommonUtilityProvider,
    public restService : RestserviceProvider) {
  }

  openVerifyOtp() {
    this.data = {
      "request":
        {
          "cellnumber":this.cellnumber,
          "deviceInfo":this.deviceInfo
      }
    }

    let sendOtpUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_SEND_OTP;
   this.restService.postDetails(sendOtpUrl,this.data).subscribe(res => {
     if(res.responseMessage.status == '200'){
      this.commonUtility.presentToast('OTP Sent in message',5000);
      console.log('Response : '+JSON.stringify(res));
       this.navCtrl.push(VerifyOtpPage,{
         cellnumber:this.cellnumber,
         deviceInfo:this.deviceInfo
       });
     }else{
       this.commonUtility.presentToast(res.responseMessage.message,5000);
     }
   });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendOtpPage');
  }

 

  openForgetPass(){
    this.navCtrl.push(ForgotPasswordPage);
  }

}
