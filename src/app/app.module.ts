import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';
import { TransactionAddPage } from '../pages/transaction-add/transaction-add';
import { DatabaseManipulationPage } from '../pages/database-manipulation/database-manipulation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { ToastControllerProvider } from '../providers/toast-controller/toast-controller';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '3f51de2f'
  }
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TransactionListPage,
    TransactionAddPage,
    DatabaseManipulationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TransactionListPage,
    TransactionAddPage,
    DatabaseManipulationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastControllerProvider,
    GooglePlus,
    DatabaseProvider,
    SQLite,
    NativeStorage
  ]
})
export class AppModule {}
