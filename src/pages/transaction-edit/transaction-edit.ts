import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TransactionListPage } from '../transaction-list/transaction-list';
import { TransactionCategoryPage } from '../transaction-category/transaction-category';

import { DatabaseProvider } from '../../providers/database/database';
import { UIProvider } from '../../providers/ui/ui';

@Component({
  selector: 'page-transaction-edit',
  templateUrl: 'transaction-edit.html',
})
export class TransactionEditPage {
  id: number;
  form = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider, private ui: UIProvider) {
    this.id = this.navParams.get('id');
    this.getTransaction(this.id);
  }

  getTransaction(id){
    this.databaseprovider.getTransacton(id).then(data => {
      this.form['amount'] = data['amount'];
      this.form['category'] = data['category'];
      this.form['description'] = data['description'];
      let day = data['date'];
      if(day < 10) {
        day = '0' + day;
      }
      let month = data['month'];
      if(month < 10) {
        month = '0' + month;
      } 
      let year = data['year'];
      this.form['date'] = year + '-' + month + '-' + day;
    });
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

  updateTransaction(){
    this.databaseprovider.updateTransaction(this.id, parseInt(this.form['amount']), this.form['category'], this.form['description'], this.form['date']).catch(e => {
      console.log('Error: ', e);
    });
    this.navCtrl.setRoot(TransactionListPage);
  }
}
