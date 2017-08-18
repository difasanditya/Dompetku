import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TransactionViewPage } from '../transaction-view/transaction-view';

import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-transaction-present',
  templateUrl: 'transaction-present.html',
})
export class TransactionPresentPage {
  empty: boolean = true;
  dates = [];
  inflow: number = 0;
  outflow: number = 0;
  total: number = 0;
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, public navParams: NavParams) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadTransaction();
      }
    })
  }

  loadTransaction() {
    var today = new Date();
    var years = today.getFullYear();
    var months = (today.getMonth() + 1).toString();
    this.databaseprovider.getTransactions(months, years).then(data => {
      if(data.length == 0){
        this.empty = true;
        return;
      }
      this.empty = false;
      let tempDate: number = 0;
      let tempTotal: number = 0;
      let tempData = [];
      data.forEach(element => {
        if(tempDate == 0){
          tempDate = element.date;
        }
        if(tempDate != element.date){
          this.dates.push({
            date: tempDate,
            total: tempTotal,
            data: tempData
          });
          tempData = [];
          tempDate = element.date;
          tempTotal = 0;
        }
        tempData.push({
          id: element.id,
          amount: element.amount,
          category: element.category,
          description: element.description
        });
        if(element.category == "Award" || element.category == "Gifts" || element.category == "Salary" || element.category == "Selling" || element.category == "Interest Money"){
          this.inflow += element.amount;
          tempTotal += element.amount;
        }
        else{
          this.outflow += element.amount;
          tempTotal -= element.amount;
        }
      });
      this.dates.push({
        date: tempDate,
        total: tempTotal,
        data: tempData
      });
      this.total = this.inflow - this.outflow;
    });
  }

  viewTransaction(ids){
    this.rootNavCtrl.push(TransactionViewPage, {id: ids})
  }
}
