import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeScreenPage } from '../home-screen/home-screen';
import { CartDetailsPage } from '../cart-details/cart-details';
import { CartProductsReviewPage } from '../cart-products-review/cart-products-review';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { SendOtpPage } from '../send-otp/send-otp';
import { VerifyOtpPage } from '../verify-otp/verify-otp';
import { UserRegistrationPage } from '../user-registration/user-registration';
import { ProfilePage } from '../profile/profile';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ContactusPage } from '../contactus/contactus';
import { LoginPage } from '../login/login';
import { OrderPage } from '../order/order';
import { OrdersPage } from '../orders/orders';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public test ="HomeScreenPage";
  constructor(public navCtrl: NavController) {

  }

  openHomeScreen(){
    console.log("test");
    this.navCtrl.push(HomeScreenPage);
  }

  openCartDetails(){
    this.navCtrl.push(CartDetailsPage);    
  }

  openCartProductsReview(){
    this.navCtrl.push(CartProductsReviewPage);
  }

  openForgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }

  openSendOTP(){
    this.navCtrl.push(SendOtpPage);
  } 
  
   openVerifyOTP(){
     this.navCtrl.push(VerifyOtpPage);
   }
   
openUserRegistration(){
  this.navCtrl.push(UserRegistrationPage);
}

openProfile(){
  this.navCtrl.push(ProfilePage);
}

openChangePassword(){
  this.navCtrl.push(ChangepasswordPage);
  }

  openContactUs(){
    this.navCtrl.push(ContactusPage);
  }

  openLogin(){
    this.navCtrl.push(LoginPage);
  }

  openOrder(){
    this.navCtrl.push(OrderPage);
  }

  openOrders(){
    this.navCtrl.push(OrdersPage);
  }


}
