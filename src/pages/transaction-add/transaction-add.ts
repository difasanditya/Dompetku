import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TransactionCategoryPage } from '../transaction-category/transaction-category';

import { DatabaseProvider } from '../../providers/database/database';
import { UIProvider } from '../../providers/ui/ui';

@Component({
  selector: 'page-transaction-add',
  templateUrl: 'transaction-add.html',
})
export class TransactionAddPage {
  form = {};

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, private ui: UIProvider) {
    this.form['category'] = "Select category";
    var today = new Date();
    var year = today.getFullYear();
    var day = today.getDate().toString();
    if(today.getDate() < 10) {
        day = '0' + day;
    }
    var month = (today.getMonth() + 1).toString();
    if(today.getMonth() + 1 < 10) {
        month = '0' + month;
    } 
    this.form['date'] = year + '-' + month + '-'+day;
  }

  addTransaction(){
    this.databaseprovider.addTransaction(parseInt(this.form['amount']), this.form['category'], this.form['description'], this.form['date']).catch(e => {
      console.log('Error: ', e);
    });
    this.form = {};
    this.navCtrl.pop();
  }

  selectCategory(){
    let modal = this.ui.modalCtrl.create(TransactionCategoryPage, {data: ""});
    modal.onDidDismiss(data => {
      if(data != null){
        this.form['category'] = data;
      }
    });
    modal.present();
  }
}