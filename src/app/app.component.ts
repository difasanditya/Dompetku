import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { LoginPage } from '../pages/login/login';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';
import { TransactionAddPage } from '../pages/transaction-add/transaction-add';
import { DatabaseManipulationPage } from '../pages/database-manipulation/database-manipulation';

import { DatabaseProvider } from '../providers/database/database';
import { ToastControllerProvider } from '../providers/toast-controller/toast-controller';
import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  image: string;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private toastController: ToastControllerProvider, public loading: LoadingController, private googlePlus: GooglePlus, private databaseprovider: DatabaseProvider) {
    this.image = "assets/img/icon.png";
    this.databaseprovider.nativeStorage.getItem("dompetku.difasanditya.com.user.auth").then(value => {
      if(value){
        this.rootPage = TransactionListPage;
        this.databaseprovider.nativeStorage.getItem("dompetku.difasanditya.com.user.imageUrl").then(data => {
          this.image = data;
        });
      }
    })
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Transaction', component: TransactionListPage },
      { title: 'Database', component: DatabaseManipulationPage }
      // { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage }
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

  logout(){
    let loader = this.loading.create({
      content: 'Please wait while we log you out',
    });
    loader.present().then(() => {
      this.googlePlus.logout().then(() => {
        this.nav.setRoot(LoginPage);
        this.databaseprovider.nativeStorage.clear();
        loader.dismiss();
        this.toastController.showToast("Logout Success");
      }).catch(e => {
        loader.dismiss();
        console.log(e);
        this.toastController.showToast("Logout Fail! Error code: " + JSON.stringify(e));
      });
    });
  }
}