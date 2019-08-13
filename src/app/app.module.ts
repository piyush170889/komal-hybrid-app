import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartDetailsPage } from '../pages/cart-details/cart-details';
import { CartProductsReviewPage } from '../pages/cart-products-review/cart-products-review';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { HomeScreenPage } from '../pages/home-screen/home-screen';
import { SendOtpPage } from '../pages/send-otp/send-otp';
import { UserRegistrationPage } from '../pages/user-registration/user-registration';
import { VerifyOtpPage } from '../pages/verify-otp/verify-otp';
import { ProfilePage } from '../pages/profile/profile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ContactusPage } from '../pages/contactus/contactus';
import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';
import { OrdersPage } from '../pages/orders/orders';
import { AddProductPage } from '../pages/add-product/add-product';
import { RestserviceProvider } from '../providers/restservice/restservice';
import { ConstantsProvider } from '../providers/constants/constants';
import { CommonUtilityProvider } from '../providers/common-utility/common-utility';
import { Network } from '@ionic-native/network';
import { HttpClientModule } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ChangepassPage } from '../pages/changepass/changepass';
import { VerifyOtpForgotpassPage } from '../pages/verify-otp-forgotpass/verify-otp-forgotpass';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CartDetailsPage,
    CartProductsReviewPage,
    ForgotPasswordPage,
    HomeScreenPage,
    SendOtpPage,
    UserRegistrationPage,
    VerifyOtpPage,
    ProfilePage,
    ChangepasswordPage,
    ContactusPage,
    LoginPage,
    OrderPage,
    OrdersPage,
    AddProductPage,
    FeedbackPage,
    ChangepassPage,
    VerifyOtpForgotpassPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CartDetailsPage,
    CartProductsReviewPage,
    ForgotPasswordPage,
    HomeScreenPage,
    SendOtpPage,
    UserRegistrationPage,
    VerifyOtpPage,
    ProfilePage,
    ChangepasswordPage,
    ContactusPage,
    LoginPage,
    OrderPage,
    OrdersPage,
    AddProductPage,
    FeedbackPage,
    ChangepassPage,
    VerifyOtpForgotpassPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestserviceProvider,
    ConstantsProvider,
    CommonUtilityProvider,
    Network,
    EmailComposer
  ]
})
export class AppModule { }
