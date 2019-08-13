import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ContactusPage } from '../pages/contactus/contactus';
import { OrdersPage } from '../pages/orders/orders';
import { HomeScreenPage } from '../pages/home-screen/home-screen';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ConstantsProvider } from '../providers/constants/constants';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  userDetails: any = {};
  pageName: { title: string, component: any };

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private events: Events
  ) {

    this.initializeApp();

    this.events.subscribe(ConstantsProvider.EVENTS_UNAUTHORISED_USER,
      () => {
        localStorage.clear();
        this.getSideMenu();
        this.nav.setRoot(LoginPage);
      });


    this.events.subscribe(ConstantsProvider.EVENTS_LOGIN_SUCCESS,
      () => {
        this.getSideMenu();
      });

    this.rootPage = HomeScreenPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.getSideMenu();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let data: any = {};

    if (page.title == 'Logout')
      data.doClearLocalStorage = true;

    this.nav.setRoot(page.component, data);
  }

  getSideMenu() {

    this.userDetails = localStorage.getItem(ConstantsProvider.LOCAL_STRG_USR_DTLS);
    console.log('UserDetails = ' + JSON.stringify(this.userDetails));

    setTimeout(
      () => {
        if (this.userDetails != null && this.userDetails != '') {
          this.userDetails = JSON.parse(this.userDetails);

          this.pages = [
            { title: 'Home', component: HomeScreenPage },
            { title: 'Track Order', component: OrdersPage },
            // { title: 'Feedback', component: FeedbackPage },
            { title: 'Contact Us', component: ContactusPage },
            { title: 'Logout', component: LoginPage }
          ];
        } else {
          this.pages = [
            { title: 'Home', component: HomeScreenPage },
            // { title: 'Feedback', component: FeedbackPage },
            { title: 'Contact Us', component: ContactusPage },
            { title: 'Login', component: LoginPage },
          ];
        }
      },
      1000
    );

  }

  openProfilePage() {

    this.nav.setRoot(ProfilePage);
  }
}
