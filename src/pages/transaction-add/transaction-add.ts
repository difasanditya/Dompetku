import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-transaction-add',
  templateUrl: 'transaction-add.html',
})
export class TransactionAddPage {
  form = {};

  constructor(public navCtrl: NavController) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var day = dd.toString();
    if(dd<10) {
        day = '0' + day;
    }

    var month = mm.toString();
    if(mm<10) {
        month = '0' + month;
    } 
    this.form['date'] = yyyy+'-'+month+'-'+day;
  }

  addTransaction(){
    alert(this.form['date']);
  }
}
