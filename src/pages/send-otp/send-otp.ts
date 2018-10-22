import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VerifyOtpPage } from '../verify-otp/verify-otp';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCntr: ToastController) {
  }

  presentToast() {
    const toast = this.toastCntr.create({
      message: 'OTP Sent In SMS',
      duration: 2000
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendOtpPage');
  }

  openVerifyOtp(){
    this.presentToast();
    this.navCtrl.push(VerifyOtpPage);
  }

  openForgetPass(){
    this.presentToast();
    this.navCtrl.push(ForgotPasswordPage);
  }

}
