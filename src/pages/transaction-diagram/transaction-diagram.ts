import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';

@Component({
  selector: 'page-transaction-diagram',
  templateUrl: 'transaction-diagram.html',
})
export class TransactionDiagramPage {
  @ViewChild('expense') expenseCanvas;
  expenseChart: any;
  @ViewChild('income') incomeCanvas;
  incomeChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad(){
    this.expenseChart = new Chart(this.expenseCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          data: [12, 0, 3, 5, 2, 0],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ]
        }]
      }
    });
    this.incomeChart = new Chart(this.incomeCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 0, 3, 5, 2, 0],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ]
        }]
      }
    });
  }

}
