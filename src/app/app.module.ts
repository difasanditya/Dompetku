import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';
import { TransactionAddPage } from '../pages/transaction-add/transaction-add';
import { TransactionPastPage } from '../pages/transaction-past/transaction-past';
import { TransactionPresentPage } from '../pages/transaction-present/transaction-present';
import { TransactionFuturePage } from '../pages/transaction-future/transaction-future';
import { TransactionViewPage } from '../pages/transaction-view/transaction-view';
import { TransactionCategoryPage } from '../pages/transaction-category/transaction-category';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';

import { DatabaseProvider } from '../providers/database/database';
import { UIProvider } from '../providers/ui/ui';

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
    TransactionPastPage,
    TransactionPresentPage,
    TransactionFuturePage,
    TransactionViewPage,
    TransactionCategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TransactionListPage,
    TransactionAddPage,
    TransactionPastPage,
    TransactionPresentPage,
    TransactionFuturePage,
    TransactionViewPage,
    TransactionCategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    SQLite,
    NativeStorage,
    DatabaseProvider,
    UIProvider
  ]
})
export class AppModule {}
