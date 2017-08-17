import { Injectable } from '@angular/core';
import { ToastController, LoadingController  } from 'ionic-angular';

@Injectable()
export class UIProvider {
  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController) {}

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  showLoading(msg: string) {
    let loader = this.loadingCtrl.create({
      content: msg
    });
    loader.present();
  }
  
  showLoadingDue(msg: string, dur: number) {
    let loader = this.loadingCtrl.create({
      content: msg,
      duration: dur
    });
    loader.present();
  }

}
