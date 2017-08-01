import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class DatabaseProvider {
  table_name: string;
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(private sqlite: SQLite, private platform: Platform, public nativeStorage: NativeStorage) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'dompetku.difasanditya.com.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.databaseReady.next(true);
      });
    });
  }
  
  setUser(userId, email, displayName, imageUrl, idToken, serverAuthCode){
    this.nativeStorage.setItem("dompetku.difasanditya.com.userId", userId);
    this.nativeStorage.setItem("dompetku.difasanditya.com.userEmail", email);
    this.nativeStorage.setItem("dompetku.difasanditya.com.userName", displayName);
    this.nativeStorage.setItem("dompetku.difasanditya.com.userImageUrl", imageUrl);
    this.nativeStorage.setItem("dompetku.difasanditya.com.userIdToken", idToken);
    this.nativeStorage.setItem("dompetku.difasanditya.com.userServerAuth", serverAuthCode);
    this.nativeStorage.setItem("dompetku.difasanditya.com.userAuth", true);
  }

  createTransaction(){
    this.database.executeSql("CREATE TABLE IF NOT EXISTS dompetku_transaction_"+this.table_name+"(id INTEGER PRIMARY KEY AUTOINCREMENT,amount INTEGER,category TEXT,description TEXT,date INTEGER,month INTEGER,year INTEGER);", []);
  }
  
  addTransaction(amount, category, description, date, month, year) {
    let data = [amount, category, description, date, month, year];
    return this.database.executeSql("INSERT INTO dompetku_transaction_"+this.table_name+"(amount, category, description, date, month, year) VALUES (?, ?, ?, ?, ? ,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
 
  getTransaction(month, year) {
    return this.database.executeSql("SELECT * FROM dompetku_transaction_"+this.table_name+" WHERE month="+month+" AND year="+year, []).then((data) => {
      let transactions = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          transactions.push({ id: data.rows.item(i).id, amount: data.rows.item(i).amount, category: data.rows.item(i).category, description: data.rows.item(i).description, date: data.rows.item(i).date, month: data.rows.item(i).month, year: data.rows.item(i).year });
        }
      }
      return transactions;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

}
