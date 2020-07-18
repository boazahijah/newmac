import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
   loaderToShow: any;

  constructor(public loadingController: LoadingController) { }

  showLoader() {
  this.loaderToShow = this.loadingController.create({
    message: 'Please wait.. loading..'
   }).then((res) => {
    res.present();

    res.onDidDismiss().then((dis) => {

    });
  });
  //this.hideLoader();
}

hideLoader() {
  setTimeout(() => {
    this.loadingController.dismiss();
  }, 700);
}

}
