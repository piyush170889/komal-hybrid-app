import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
toggle="show";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void{   
    
      this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
      this.toggle=(this.isActiveToggleTextPassword==true)?"show":"hide";
  }
  

  public getType() {
    
      return this.isActiveToggleTextPassword ? 'password' : 'text';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
