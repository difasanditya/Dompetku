import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAuth} from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';

import { Storage } from '@ionic/storage';
import { ToastControllerProvider } from '../providers/toast-controller/toast-controller';
import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public googleAuth: GoogleAuth, private toastController: ToastControllerProvider, private storage: Storage, public loading: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Transaction', component: TransactionListPage }
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
      this.googleAuth.logout().then(() => {
        this.storage.set('dompetku.difasanditya.com_loggedin', false);
        this.nav.setRoot(LoginPage);
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
