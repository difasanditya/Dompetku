import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-transaction-category',
  templateUrl: 'transaction-category.html',
})
export class TransactionCategoryPage {
  category = "income";
  income = ["Award","Gifts","Salary","Selling","Interest Money"];
  expense = ["Food and Beverage","Bills and Utilities","Transportation","Shopping","Entertaiment","Travel","Health and Fitness","Gift and Donation","Family","Education","Investment","Business","Insurance","Fee and Charges"];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
