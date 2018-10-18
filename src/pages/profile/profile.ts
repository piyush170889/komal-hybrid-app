import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Icustomer } from './customer';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
public name="sushant";
 public customer:Icustomer=new Icustomer();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  

 public isDisable=true;

  ionViewDidLoad() {
    this.customer = new Icustomer();
    console.log('ionViewDidLoad ProfilePage'); 
     
    
  }

 public toggle(){
    this.isDisable=(this.isDisable==false)?true:false;
  
    
    return this.isDisable;
  }
  }


