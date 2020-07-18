import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { FetchDataService } from './fetch-data.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { GoogleAdDisplayService } from './google-ad-display.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    private dataService: FetchDataService,private uniqueDeviceID: UniqueDeviceID,private adService : GoogleAdDisplayService,
    private toastController:ToastController,
    private network: Network, private alertController:AlertController
 ) {
    this.initializeApp();
  }
  async  presentAlert(){
  const alert = await this.alertController.create({
  header: 'OOPS ! No network connection found',
  subHeader:'Please check your internet connection.',
  message: 'Press ok, to redirect to the offline favorites screen',
  buttons: [
  {
      text: 'Ok',
      handler: () => {
        this.router.navigate(['/favoritescreen']);
        }
      }

  ]
  });

  await alert.present();
  }
  showOnlineToast() {
    let toast = this.toastController.create({
      message: 'You are back online.',
      duration: 2000,
      color:'secondary',
      translucent:true,
      animated:true
    }).then((toastData)=>{
      toastData.present();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.adService.prepareRewardVideoAds();
      this.fcm.getToken().then(token => {
        this.uniqueDeviceID.get()
        .then((uuid: any) =>{
          this.dataService.saveDeviceDetails(token, uuid,"T").subscribe((res) =>{
          });
        });
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        this.uniqueDeviceID.get()
        .then((uuid: any) => {
          this.dataService.saveDeviceDetails(token, uuid,"T").subscribe((res) =>{
          });
                });
      });

this.fcm.onNotification().subscribe(data => {
  console.log(data);
  if (data.wasTapped) {
    console.log('Received in background');
    this.router.navigate(['/songdetails', { songName: data.songname }]);
  } else {
    console.log('Received in foreground');
    //this.router.navigate([data.landing_page, data.price]);
  }
});

let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //this.presentAlert(); //some alert msg that netwk has gone
  });

  let connectSubscription = this.network.onConnect().subscribe(() => {
    //this.showOnlineToast();
  });

    });
  }
}
