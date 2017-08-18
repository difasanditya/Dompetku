import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TransactionEditPage } from '../transaction-edit/transaction-edit';

import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-transaction-view',
  templateUrl: 'transaction-view.html',
})
export class TransactionViewPage {
  id: number;
  transaction = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider) {
    this.id = this.navParams.get('id');
    this.getTransaction(this.id);
  }
  
  getTransaction(id){
    this.databaseprovider.getTransacton(id).then(data => {
      this.transaction['amount'] = data['amount'];
      this.transaction['category'] = data['category'];
      this.transaction['description'] = data['description'];
      this.transaction['date'] = data['date'];
    });
  }

  editTransaction(ids){
    this.navCtrl.push(TransactionEditPage, {id: ids});
  }
}