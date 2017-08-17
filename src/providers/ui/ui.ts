import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from 'ionic-angular';

@Injectable()
export class UIProvider {
  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {}

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
