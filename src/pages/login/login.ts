import { Component } from '@angular/core';
import { Events, NavController, MenuController, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { TransactionListPage } from '../transaction-list/transaction-list';

import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, public loading: LoadingController, private googlePlus: GooglePlus, private databaseprovider: DatabaseProvider, private events: Events) {
    this.menuCtrl.close();
    this.menuCtrl.enable(false, 'myMenu');
  }

  login(){
    let loader = this.loading.create({
      content: 'Please wait while we log you in',
    });
    loader.present().then(() =>{
      this.googlePlus.login({
        'scopes': '',
        'webClientId': '826148477623-qcvvqr7t304mfdh1dq9uat7e1jg2eegu.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        this.databaseprovider.createTransaction();
        this.events.publish('user:login', res["userId"], res["email"], res["displayName"], res["imageUrl"]);
        this.databaseprovider.setUser(res["userId"], res["email"], res["displayName"], res["imageUrl"]);
        this.navCtrl.setRoot(TransactionListPage);
        loader.dismiss();
        //this.toastController.showToast("Login success!");
      }).catch(e => {
        console.error(e);
        loader.dismiss();
        if(JSON.stringify(e) != '12501'){
          //this.toastController.showToast("Login error! Error code: " + JSON.stringify(e));
        }
      });
    });
  }

}
