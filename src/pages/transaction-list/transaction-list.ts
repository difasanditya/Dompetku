import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
})
export class TransactionListPage {
  form = {};
  transactions = [];

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private databaseprovider: DatabaseProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadTransaction();
      }
    })
  }

  loadTransaction() {
    this.databaseprovider.getTransaction(7, 2017).then(data => {
      this.transactions = data;
    })
  }
 
  addTransaction() {
    this.databaseprovider.addTransaction(this.form['description'], parseInt(this.form['amount']), this.form['category'], parseInt(this.form['date']), parseInt(this.form['month']), parseInt(this.form['year'])).then(data => {
      this.loadTransaction();
    }).catch(e => {
      alert(JSON.stringify(e));
    });
    this.form = {};
  }

}
