import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-database-manipulation',
  templateUrl: 'database-manipulation.html',
})
export class DatabaseManipulationPage {

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private databaseprovider: DatabaseProvider) {
    
  }

  login(){
    this.googlePlus.login({
      'scopes': '',
      'webClientId': '826148477623-qcvvqr7t304mfdh1dq9uat7e1jg2eegu.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      this.databaseprovider.createUser(res["userId"], res["email"], res["displayName"], res["imageUrl"], res["idToken"], res["serverAuthCode"]);
      this.databaseprovider.createTransaction();
      alert("Login success!");
    }).catch(e => {
      console.error(e);
      alert("Login error! Error code: " + JSON.stringify(e));
    });
  }

  silent_login(){
    this.googlePlus.trySilentLogin({
      'scopes': '',
      'webClientId': '826148477623-qcvvqr7t304mfdh1dq9uat7e1jg2eegu.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      this.databaseprovider.createUser(res["userId"], res["email"], res["displayName"], res["imageUrl"], res["idToken"], res["serverAuthCode"]);
      this.databaseprovider.createTransaction();
      alert("Login success!");
    }).catch(e => {
      console.error(e);
      alert("Login error! Error code: " + JSON.stringify(e));
    });
  }

  database_ready(){
    if(this.databaseprovider.getDatabaseState()){
      alert("Ready");
    }
    else{
      alert("Not ready");
    }
  }

  create_table_user(){
    // this.databaseprovider.createUser(res["userId"], res["email"], res["displayName"], res["imageUrl"], res["idToken"], res["serverAuthCode"]);
  }

  create_table_transaction(){
    // this.databaseprovider.createTransaction();
  }

  drop_table_user(){
    // this.databaseprovider.dropUser();
  }

  drop_table_transaction(){
    // this.databaseprovider.dropTransaction();
  }

  set_storage(bool){
    this.databaseprovider.nativeStorage.setItem("dompetku.difasanditya.com_user_auth", bool).then(() => {
      alert("Stored");
    });
  }

  remove_storage(){
    this.databaseprovider.nativeStorage.remove("dompetku.difasanditya.com_user_auth").then(() =>{
      alert("Removed");
    }).catch(err => {
      alert("error: "+JSON.stringify(err));
    });
  }

  clear_storage(){
    this.databaseprovider.nativeStorage.clear().then(() =>{
      alert("Cleared");
    }).catch(err => {
      alert("error: "+JSON.stringify(err));
    });
  }

  get_keys(){
    this.databaseprovider.nativeStorage.keys().then(data =>{
      alert(JSON.stringify(data));
    }).catch(err => {
      alert("error: "+JSON.stringify(err));
    });
  }

  get_storage(){
    this.databaseprovider.nativeStorage.getItem("dompetku.difasanditya.com_user_auth").then(data => {
      alert("value: "+data);
    }).catch(err => {
      alert("error: "+JSON.stringify(err));
    });
  }

  check_table_user(){
    this.databaseprovider.checkUser().then(data => {
      if(data){
        alert("Exist");
      }
      else{
        alert("Not Exist");
      }
    });
  }

}