import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-transaction-present',
  templateUrl: 'transaction-present.html',
})
export class TransactionPresentPage {
  empty: boolean = true;
  transactions = [];
  inflow: number = 0;
  outflow: number = 0;

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider) {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadTransaction();
      }
    })
  }

  loadTransaction() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString();
    this.databaseprovider.getTransaction(month, year).then(data => {
      if(data.length == 0){
        this.empty = true;
        return;
      }
      this.transactions = data;
      this.empty = false;
      this.transactions.forEach(element => {
        this.inflow = this.outflow += element.amount;
      });
    });
  }
}
