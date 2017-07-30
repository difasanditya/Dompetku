import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastControllerProvider {

  constructor(private toastCtrl: ToastController) {
    
  }

  showToast(messages) {
  let toast = this.toastCtrl.create({
    message: messages,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

}
