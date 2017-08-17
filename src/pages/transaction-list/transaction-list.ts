import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';

import { TransactionAddPage } from '../transaction-add/transaction-add';
import { TransactionPastPage } from '../transaction-past/transaction-past';
import { TransactionPresentPage } from '../transaction-present/transaction-present';
import { TransactionFuturePage } from '../transaction-future/transaction-future';

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
})
export class TransactionListPage {
  page1: any = TransactionPastPage;
  page2: any = TransactionPresentPage;
  page3: any = TransactionFuturePage;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private superTabsCtrl: SuperTabsController) {
    this.menuCtrl.enable(true, 'myMenu');
    this.superTabsCtrl.showToolbar(true);
  }

  addPage(){
    this.navCtrl.push(TransactionAddPage);
  }

}
