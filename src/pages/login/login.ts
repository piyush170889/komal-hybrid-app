import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeScreenPage } from '../home-screen/home-screen';
import { SendOtpPage } from '../send-otp/send-otp';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string;
  password:string;
  data:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restService:RestserviceProvider, public commonUtility: CommonUtilityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotoHomeScreen(){
    this.navCtrl.push(HomeScreenPage);
  }

  login(){

    if(this.username == null || this.username == '' || this.password == null || this.password == ''){
      this.commonUtility.presentToast('Invalid Credentials. Please Enter Valid Credentials', 5000);
    }else{
      this.data = {
        "request": {
          "cmpnyInfoId":"56",
          "loginId":this.username,
          "password":this.password
        }
      }
      let loginUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_LOGIN;
      this.restService.postDetails(loginUrl,this.data).subscribe( res=>{
        console.log('UserDetails :'+JSON.stringify(res.userDetails));
        if(res.responseMessage.status == 200){
          localStorage.setItem('userDetails',res.userDetails);
          this.navCtrl.push(HomeScreenPage);
        }else{
          this.commonUtility.presentToast('Invalid Credentials. Please Enter Valid Credentials', 5000);
        }
  
  
      });
    }
    

  }

  sendOtpRegister(){
    this.navCtrl.push(SendOtpPage);
  }

  openSendOtp(){
    this.navCtrl.push(SendOtpPage);
  }


}
