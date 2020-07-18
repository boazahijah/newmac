import { Component, OnInit  } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { Router } from '@angular/router';
import { LoadingServiceService } from '../loading-service.service';
import { GoogleAdDisplayService } from '../google-ad-display.service';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonSlides  } from '@ionic/angular';
import * as timeago from 'timeago.js'
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {

  languages: any = []
  loading:any;
  slideOptions = {
  initialSlide: 0,
  speed: 300,
  autoplay: {
    disableOnInteraction: false
  }
};
tamilLatestAdditions:any;
hindiLatestAdditions:any;
englishLatestAdditions:any;
malayalamLatestAdditions:any;
malayalamSongsCount:any;
hindiSongsCount:any;
englishSongsCount:any;
tamilSongsCount:any;
tamilSongsBanner:any = [];
tamilMostHits:any;
hindiMostHits:any;
englishMostHits:any;
malayalamMostHits:any;
appurl:any;

  constructor(private dataService: FetchDataService, private router:Router,
  private loadingService : LoadingServiceService,private adService : GoogleAdDisplayService,private network:Network,
private alertController:AlertController,private platform:Platform, public loadingController: LoadingController,
private appVersion : AppVersion,private favoritesService : FavoritesService) {
this.initializeApp();
}
slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
}
initializeApp(){
  //this.platform.ready().then(() => {
//});
}
  async ngOnInit() {
    if(!this.isConnected()){
      this.networkAlert();
    }else{
    await  this.favoritesService.getIsAppRated().then(appratestatus =>{
  if(!appratestatus || appratestatus == 0){
    this.presentAlert();
  }
});


   this.showLoader("Please wait.. loading..");

  //console.log(timeago.format(new Date()));
  this.dataService.getAppProperty("Tamil Guitar Chords","appurl").subscribe((data:any) => {
    this.appurl = data[0].value;
  });
  this.appVersion.getVersionNumber().then(applocalversion => {
    this.dataService.getAppProperty("Tamil Guitar Chords","appversion").subscribe((data:any) => {
    if(data[0].value != applocalversion){
      //console.log(applocalversion);
      this.appUpdateAlert();
    }
    });
  });
  this.dataService.getSongsCount("Tamil Songs").subscribe((count:any) => {
    this.tamilSongsCount = count;
  });

     this.dataService.getLanguages().subscribe((data:any) => {
        this.languages = Array.from(Object.keys(data), k=>data[k]);
        for(var i=0;i<data.length;i++){
          if(data[i].languagename == "Tamil Songs"){
            this.tamilSongsBanner.push(data[i]);
            this.tamilSongsBanner[i].count = this.tamilSongsCount;
          }
        }
        this.hideLoader();
    });
    this.dataService.getLastFiveEntries("Tamil Songs").subscribe((data:any) =>{
    for(var i=0;i<data.length;i++){
      data[i].lastUpdatedDesc = timeago.format(data[i].createdAt);
    }
      this.tamilLatestAdditions = data;
   });


this.dataService.getFirstFiveHits("Tamil Songs").subscribe((data:any) => {
  this.tamilMostHits = data;
});
}
  }

  async  presentAlert(){
  const alert = await this.alertController.create({
  header: 'Please review us.',
  message: 'Please take some time and review us so that it will help us in improving this app in a better way.',
  buttons: [
    {
      text: 'Rate now',
      handler: () => {
        this.favoritesService.setIsAppRated(1);
        window.open("market://details?id=com.app.tamilguitarchords", '_system');
      }
    },
    {
      text: 'Remind me later',
      handler: () => {
        this.favoritesService.setIsAppRated(0);
        console.log('Buy clicked');
      }
    },
    {
      text: 'No Thanks.',
      handler: () => {
        this.favoritesService.setIsAppRated(2);
      }
    }
  ]
  });

  await alert.present();
  }

  async showLoader(message: string = null) {
      this.loading = await this.loadingController.create({
          message: message });
      return await this.loading.present();
  }
  async hideLoader() {
      setTimeout(() => {
          return this.loading.dismiss();
      }, 1000);
  }

  async  appUpdateAlert(){
  const alert = await this.alertController.create({
  header: 'Hurray ! A new update is available for the app.',
  message: 'Please update your app for better user experience and to enjoy new exciting features.',
  buttons: [
    {
        text: 'Update now',
        handler: () => {
          window.open(this.appurl, '_system');
        }
      },{
        text: 'Update later',
        handler: () => {

        }
      }

  ]
  });

  await alert.present();
  }

  async  networkAlert(){
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

  isConnected(){
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }

  navigateToSongList(languageName){
    this.router.navigate(['/songlist', { languageName: languageName }]);
  }
  navigateToSongDetails(songName){
    this.router.navigate(['/songdetails', { songName: songName }]);
  }
  ionViewWillEnter(){
    this.adService.showBannerAd();
  }
}
