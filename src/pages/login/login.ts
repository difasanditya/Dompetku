import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { GoogleAuth, User } from '@ionic/cloud-angular';

import { Storage } from '@ionic/storage';
import { ToastControllerProvider } from '../../providers/toast-controller/toast-controller';
import { LoadingController } from 'ionic-angular';

import { TransactionListPage } from '../transaction-list/transaction-list';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, public googleAuth: GoogleAuth, public user: User, private toastController: ToastControllerProvider, private storage: Storage, public loading: LoadingController) {
    this.menuCtrl.close();
    this.menuCtrl.enable(false, 'myMenu');
    let loader = this.loading.create({
      content: 'Please wait while we getting ready',
    });
    loader.present().then(() =>{
      this.storage.get('dompetku.difasanditya.com_loggedin').then(val => {
        if (val) {
          this.navCtrl.setRoot(TransactionListPage);
          loader.dismiss();
          this.toastController.showToast("Automatic logged in!");
        }
        else{
          loader.dismiss();
        }
      });
    });
  }

  login(){
    let loader = this.loading.create({
      content: 'Please wait while we log you in',
    });
    loader.present().then(() =>{
      this.googleAuth.login().then(() => {
          this.navCtrl.setRoot(TransactionListPage);
          this.storage.set('dompetku.difasanditya.com_loggedin', true);
          loader.dismiss();
          this.toastController.showToast("Login success!");
        
      }).catch( e => {
        console.log(e);
        loader.dismiss();
        if(JSON.stringify(e) != '12501'){
          this.toastController.showToast("Login error! Error code: " + JSON.stringify(e));
        }
      });
    });
  }

}
