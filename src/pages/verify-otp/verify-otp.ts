import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserRegistrationPage } from '../user-registration/user-registration';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCntr: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyOtpPage');
  }
  presentToast() {
    const toast = this.toastCntr.create({
      message: 'OTP Verified Successfully',
      duration: 2000
    });
    toast.present();
  }
  openRegistrationForm(){
    this.presentToast();
    this.navCtrl.push(UserRegistrationPage)
  }

}
