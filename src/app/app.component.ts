import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { LoginPage } from '../pages/login/login';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';

import { LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  image: string = "assets/img/icon.png";
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public loading: LoadingController, private googlePlus: GooglePlus, private databaseprovider: DatabaseProvider, private events: Events) {
    let loader = this.loading.create({
      content: 'Please wait',
    });
    loader.present().then(() => {
      this.googlePlus.trySilentLogin({
        'scopes': '',
        'webClientId': '826148477623-qcvvqr7t304mfdh1dq9uat7e1jg2eegu.apps.googleusercontent.com',
        'offline': true
      }).then(res =>{
        this.events.publish('user:login', res["userId"], res["email"], res["displayName"], res["imageUrl"]);
        this.databaseprovider.setUser(res["userId"], res["email"], res["displayName"], res["imageUrl"]);
        this.rootPage = TransactionListPage;
        this.initializeApp();
      }).catch(err => {
        console.log(err);
        this.databaseprovider.nativeStorage.getItem("dompetku.difasanditya.com.auth").then(val => {
          if(val){
            this.rootPage = TransactionListPage;
            this.databaseprovider.nativeStorage.getItem("dompetku.difasanditya.com.user").then(res => {
              this.events.publish('user:login', res["userId"], res["email"], res["displayName"], res["imageUrl"]);
            })
          }
        })
        this.initializeApp();        
      });
    });
    this.pages = [
      { title: 'Transaction', component: TransactionListPage }
    ];
    this.eventListener();
    loader.dismiss();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  eventListener(){
    this.events.subscribe('user:login', (userId, email, name, img) => {
      this.image = img;
    });
    this.events.subscribe('user:logout', () => {
      
    });
  }

  logout(){
    let loader = this.loading.create({
      content: 'Please wait while we log you out',
    });
    loader.present().then(() => {
      this.googlePlus.logout().then(() => {
        this.events.publish('user:logout');
        this.nav.setRoot(LoginPage);
        this.databaseprovider.deleteTransaction();
        this.databaseprovider.nativeStorage.setItem("dompetku.difasanditya.com.auth", false);
        loader.dismiss();
        //this.toastController.showToast("Logout Success");
      }).catch(err => {
        loader.dismiss();
        console.log(err);
        //this.toastController.showToast("Logout Fail! Error code: " + JSON.stringify(e));
      });
    });
  }
}