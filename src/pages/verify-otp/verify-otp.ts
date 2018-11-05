import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserRegistrationPage } from '../user-registration/user-registration';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';
import { SendOtpPage } from '../send-otp/send-otp';

/**
 * Generated class for the VerifyOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-otp',
  templateUrl: 'verify-otp.html',
})
export class VerifyOtpPage {

  datatoResend:any={};
  data:any={};
  otp:number;
  cellnumber:string;
  deviceInfo:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public restService: RestserviceProvider,
    public commonUtility : CommonUtilityProvider) {
      this.cellnumber = navParams.get('cellnumber');
      this.deviceInfo = navParams.get('deviceInfo');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyOtpPage');
  }
  

  openRegistrationForm(){
  this.data = {
      "request":
        {
          "cellnumber":this.cellnumber,
          "deviceInfo":this.deviceInfo,
          "otp":this.otp
      }
    }

    let verifyOtpUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_VERIFY_OTP;
    this.restService.postDetails(verifyOtpUrl,this.data).subscribe(res=>{
      if(res.responseMessage.status == '200'){
        this.commonUtility.presentToast('OTP Verified Succeffully',3000);
      this.navCtrl.push(UserRegistrationPage,{
           cellnumber:this.cellnumber
          });
       }else{
         this.commonUtility.presentToast(res.responseMessage.message,5000);
       }

    });

  }

  resendOtp(){
    this.datatoResend = {
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
       this.navCtrl.push(VerifyOtpPage,{
         cellnumber:this.cellnumber,
         deviceInfo:this.deviceInfo
       });
     }else{
       this.commonUtility.presentToast(res.responseMessage.message,5000);
     }
   });
  }

}
