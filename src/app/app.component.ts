import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ContactusPage } from '../pages/contactus/contactus';
import { OrdersPage } from '../pages/orders/orders';
import { HomeScreenPage } from '../pages/home-screen/home-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomeScreenPage;

  pages: Array<{title: string, component: any}>;

  userDetails : any={};
  pageName : {title: string, component: any};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    let key = 'userDetails';
    this.userDetails =  localStorage.getItem(key);
    // if(this.userDetails != null)
    // {
    //   this.pageName =  { title: 'Logout', component: LoginPage };
    // }else{
    //   this.pageName =  { title: 'Login', component: LoginPage };

    // }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomeScreenPage },
      { title: 'Contact Us', component: ContactusPage },
      { title: 'Track Order', component: OrdersPage },
      { title: 'Feedback', component: OrdersPage },
      { title: 'Login', component: LoginPage },
      { title: 'Logout', component: LoginPage }
      // this.pageName
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
