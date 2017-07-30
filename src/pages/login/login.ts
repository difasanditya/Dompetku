import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { ToastControllerProvider } from '../../providers/toast-controller/toast-controller';
import { LoadingController } from 'ionic-angular';

import { TransactionListPage } from '../transaction-list/transaction-list';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private toastController: ToastControllerProvider, public loading: LoadingController, private googlePlus: GooglePlus) {
    this.menuCtrl.close();
    this.menuCtrl.enable(false, 'myMenu');
    let loader = this.loading.create({
      content: 'Please wait while we getting ready',
    });
    loader.present().then(() =>{
      this.googlePlus.trySilentLogin({
        'scopes': '',
        'webClientId': '826148477623-qcvvqr7t304mfdh1dq9uat7e1jg2eegu.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        this.navCtrl.setRoot(TransactionListPage);
        alert(JSON.stringify(res));
      });
      loader.dismiss();
    });
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
      })
      .then(res => {
        this.navCtrl.setRoot(TransactionListPage);
        alert(JSON.stringify(res));        
        loader.dismiss();
        this.toastController.showToast("Login success!");
      }).catch(e => {
        console.error(e);
        loader.dismiss();
        if(JSON.stringify(e) != '12501'){
          this.toastController.showToast("Login error! Error code: " + JSON.stringify(e));
        }
      });
    });
  }

}
