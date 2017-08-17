import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-transaction-add',
  templateUrl: 'transaction-add.html',
})
export class TransactionAddPage {
  form = {};

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider) {
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
}
