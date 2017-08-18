import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  
  constructor(private sqlite: SQLite, private platform: Platform, public nativeStorage: NativeStorage) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'dompetku.difasanditya.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          this.database = db;
          this.databaseReady.next(true);
        });
    });
  }
  
  setUser(userId, email, displayName, imageUrl){
    this.nativeStorage.setItem("dompetku.difasanditya.com.user", {
      "userId ": userId,
      "email": email,
      "displayName": displayName,
      "imageUrl": imageUrl,
    });
    this.nativeStorage.setItem("dompetku.difasanditya.com.auth", true);
}

  createTransaction(){
    this.database.executeSql("DROP TABLE IF EXISTS dompetku_transactions;", []);
    this.database.executeSql("CREATE TABLE dompetku_transactions (id INTEGER PRIMARY KEY AUTOINCREMENT,amount INTEGER,category TEXT,description TEXT,date INTEGER,month INTEGER,year INTEGER);", []);
  }

  deleteTransaction(){
    this.database.executeSql("DROP TABLE IF EXISTS dompetku_transactions;", []);
  }

  backupTransaction(){
    /*var link = 'https://dompetku.difasanditya.com/backup.php';
    var myData = JSON.stringify({
      //name: this.name,
    });
    this.http.post(link, myData).subscribe(data => {
    }, error => {
    });*/
  }

  restoreTransaction(){
    
  }

  addTransaction(amount, category, description, date){
    date = date.split("-");
    let day = date[2];
    let month = date[1];
    let year = date[0];
    let data = [amount, category, description, day, month, year];
    return this.database.executeSql("INSERT INTO dompetku_transactions (amount, category, description, date, month, year) VALUES (?, ?, ?, ?, ? ,?);", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getTransacton(id){
    return this.database.executeSql("SELECT * FROM dompetku_transactions WHERE id="+id+";", []).then(data => {
      let transaction = {
        id: data.rows.item(0).id,
        amount: data.rows.item(0).amount,
        category: data.rows.item(0).category,
        description: data.rows.item(0).description,
        date: data.rows.item(0).date,
        month: data.rows.item(0).month,
        year: data.rows.item(0).year
      };
      return transaction;
    }).catch(err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getTransactions(month, year){
    return this.database.executeSql("SELECT * FROM dompetku_transactions WHERE month="+month+" AND year="+year+" ORDER BY date ASC, description ASC;", []).then(data => {
      let transactions = [];
      if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            transactions.push({
              id: data.rows.item(i).id,
              amount: data.rows.item(i).amount,
              category: data.rows.item(i).category,
              description: data.rows.item(i).description,
              date: data.rows.item(i).date,
              month: data.rows.item(i).month,
              year: data.rows.item(i).year
          });
        }
      }
      return transactions;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  updateTransaction(id, amount, category, description, date){
    date = date.split("-");
    let day = date[2];
    let month = date[1];
    let year = date[0];
    let data = [amount, category, description, day, month, year];
    return this.database.executeSql("UPDATE dompetku_transactions SET amount=?, category=?, description=?, date=?, month=?, year=? WHERE id="+id+";", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
