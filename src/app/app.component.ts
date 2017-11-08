import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  component:any;
  logsOut?:boolean;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  logoutMenu: PageInterface[] = [
    { title: 'Home', component: HomePage },
    { title: 'Login', component: LoginPage } 
  ];
  loginMenu: PageInterface[] = [
    { title: 'Home', component: HomePage },
    { title: 'Logout',component:HomePage,logsOut:true}
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menu: MenuController,
    public events: Events,
    public userData: UserData,
    public toastCtrl: ToastController,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loginMenu');
    this.menu.enable(!loggedIn, 'logoutMenu');
  }

  openPage(page: PageInterface,) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
     if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      let toast = this.toastCtrl.create({
        message:'Logged Out',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      this.userData.logout();
    }
  }
}
