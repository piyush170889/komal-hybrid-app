import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeScreenPage } from '../home-screen/home-screen';
import { SendOtpPage } from '../send-otp/send-otp';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotoHomeScreen(){
    this.navCtrl.push(HomeScreenPage);
  }

  sendOtpRegister(){
    this.navCtrl.push(SendOtpPage);
  }

  openSendOtp(){
    this.navCtrl.push(SendOtpPage);
  }


}
