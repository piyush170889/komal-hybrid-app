import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  isActiveToggleTextPassword: Boolean = true;

  public toggleTextPassword(): void {
  this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;

    this.toggle = (this.isActiveToggleTextPassword == true) ? "Show" : "Hide";

  } public getType() { return this.isActiveToggleTextPassword ? 'password' : 'text'; }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');
  }

}
