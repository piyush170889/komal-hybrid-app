import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { HomeScreenPage } from '../home-screen/home-screen';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer:EmailComposer) {
   this.sendEmail(); 
   
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  sendEmail() {
    let email = {
      to: 'tekchandbheda@gmail.com',
      cc: 'tekchandbheda@gmail.com',
      attachments: [
      ],
      subject: 'Feedback',
      body: '',
      isHtml: true
    };
 
    this.emailComposer.open(email);
    this.navCtrl.push(HomeScreenPage);
  }
}
