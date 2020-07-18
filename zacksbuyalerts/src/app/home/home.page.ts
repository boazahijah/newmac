import { Component, OnInit  } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { Router } from '@angular/router';
import { GoogleAdDisplayService } from '../google-ad-display.service';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { IonSlides  } from '@ionic/angular';
import * as timeago from 'timeago.js'
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {
  recentChanges:any;
  changeTickers:any = [];
  languages: any = []
  loading:any;
  slideOptions = {
  initialSlide: 0,
  speed: 300,
  slidesPerView:2.5,
  spaceBetween:-30,
  pagination : false,
  autoplay:false
};
slideOptionsZacksRank = {
initialSlide: 0,
speed: 300,
slidesPerView:2.5,
spaceBetween:-30,
pagination : false,
autoplay:false

};
zacksRanks:any = [];
industries:any = [];
appurl = "http://139.59.12.180/";
_appurl:any;
errorIcon:any;
viewalliconurl:any;
viewalliconurl2:any;
recentchangetext:any;
deviceid:any;
username:any;
errorLogo:any;
rewardCredit = 0;
currentUrlName = "";
currentUrlArray:any = [];
currentUrl:any = [];
pagestatus = 0;
  constructor(private dataService: FetchDataService, private router:Router,
  private adService : GoogleAdDisplayService,private network:Network,
private alertController:AlertController,private platform:Platform,
private appVersion : AppVersion, private modalController : ModalController,
private loadingController : LoadingController,
private uniqueDeviceID: UniqueDeviceID,
private favoritesService : FavoritesService) {
this.initializeApp();
}
slidesDidLoad(slides: IonSlides) {
    //slides.startAutoplay();
}
initializeApp(){
  this.platform.ready().then(() => {

    document.addEventListener('admob.rewardvideo.events.REWARD', () => {
      this.hideLoader();
      this.favoritesService.clearRewardCredit();
      this.router.navigate(this.currentUrlArray);
    });

    document.addEventListener('admob.rewardvideo.events.CLOSE', () => {
      this.hideLoader();
      this.adService.prepareRewardVideoAds();
  });
    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', () => {
      this.hideLoader();
      this.adService.prepareRewardVideoAds();
      if(this.currentUrlArray && this.currentUrlArray.length != 0){
        this.alertAd.dismiss();
        this.currentUrl = this.currentUrlArray;
        this.currentUrlArray = [];
        this.router.navigate(this.currentUrl);
      }
    });

});

}
  async ngOnInit() {
    this.pagestatus = 1;
    if(!this.isConnected()){
     this.networkAlert();
    }else{

      await this.favoritesService.getRewardCredits().then(credit =>{
        //alert(credit);
              this.rewardCredit = credit;
      });


await  this.favoritesService.getIsAppRated().then(appratestatus =>{
  if(!appratestatus || appratestatus == 0){
    this.presentAlert();
  }
});

  this.showLoader("Loading..Please wait..");
  this.errorIcon = this.appurl + "zacksalerts/min/notfound.jpg";
  this.viewalliconurl = this.appurl +"zacksalerts/min/search.jpg";
  this.viewalliconurl2 = this.appurl +"zacksalerts/min/search2.jpg";
  this.zacksRanks.push(
    {"rank":"Strong Buy",
      "url":"http://139.59.12.180/zacksalerts/min/rich.jpg"});
      this.zacksRanks.push(
        {"rank":"Buy",
          "url":"http://139.59.12.180/zacksalerts/min/rich2.jpg"});
          this.zacksRanks.push(
            {"rank":"Hold",
              "url":"http://139.59.12.180/zacksalerts/min/hold.jpg"});
              this.zacksRanks.push(
                {"rank":"Sell",
                  "url":"http://139.59.12.180/zacksalerts/min/sell.jpg"});
                  this.zacksRanks.push(
                    {"rank":"Strong Sell",
                      "url":"http://139.59.12.180/zacksalerts/min/strongsell.jpg"});

  this.dataService.getIndustryNamesMaster().subscribe((data:any[]) => {
    if(data){
      for(var i=0; i<data.length;i++){
        data[i].image = this.appurl+"zacksalerts/min/"+data[i].industryName+".jpg"
      }
    }
    this.industries = data;
  });

  await this.setUserName();
  await this.setdeviceid();
  this.errorLogo = this.appurl + "zacksalerts/min/404.jpg";
  this.dataService.getRecentZacksRankChanges(0,this.username,this.deviceid).subscribe((data:any) => {
    if(data){
      this.recentChanges = data;
      this.recentchangetext = timeago.format(data.dateofchange);
      for(var i=0; i< this.recentChanges.changetickers.length; i++){
      this.changeTickers.push(this.recentChanges.changetickers[i]);
      }
    }
    this.hideLoader();
  });
  this.dataService.getAppProperty("Zacks rank alerts","appurl").subscribe((data:any) => {
    this._appurl = data[0].value;
  });

  this.appVersion.getVersionNumber().then(applocalversion => {
  this.dataService.getAppProperty("Zacks rank alerts","appversion").subscribe((data:any) => {
  if(data[0].value != applocalversion){
    //console.log(applocalversion);
    this.appUpdateAlert();
  }
  });
});

  }
}

alertAd:any;
async  presentAdAlert(){
 this.alertAd = await this.alertController.create({
header: 'Credits expired !  ',
subHeader:'Please watch a video ad to reload the credits,',
backdropDismiss: false,
message: 'As Ads are our only source of revenue, we will feel grateful if you spend few seconds watching the ad to support us,! Thank you.',
buttons: [
{
    text: 'Ok',
    handler: () => {
      this.adService.isVideoAdReady().then((isReady) => {
        if(isReady == "true"){
          this.adService.showRewardVideoAds();
        }else{
          this.showLoader("Loading ad..Please wait..");
          this.adService.showRewardVideoAdsIfNotReady().then(()=>{
            this.hideLoader();
          });
        }
      });
      }
    }
  ]
});

await this.alertAd.present();
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
      window.open("market://details?id=com.app.zacksbuyalerts", '_system');
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
  async setUserName() {
     await this.favoritesService.getUserName().then((username) =>{
     //  alert(username);
       this.username = username;
     });
   }
   async setdeviceid(){
     await this.favoritesService.getDeviceid().then((deviceid) =>{
       this.deviceid = deviceid;
     });
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
          window.open(this._appurl, '_system');
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
  buttons: [
  {
      text: 'Ok',
      handler: () => {
        ///this.router.navigate(['/favoritescreen']);
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

  async navigateToZacksRankListAll(){
    this.currentUrlArray = ['/zacks-stock-ticker-list', { type: "all"}];
this.pagestatus = 0;
    await this.favoritesService.getRewardCredits().then(credit =>{
      if(credit > 6){
        this.favoritesService.clearRewardCredit();
      }
      this.favoritesService.getRewardCredits().then(credit =>{
        if(credit == 1 || credit == 2 ){
          this.adService.prepareRewardVideoAds();
        }
        if(credit != 6){
          this.favoritesService.incrementRewardsCredit().then(count =>{
            if(credit === 6){
              this.presentAdAlert();
            }else{
              this.pagestatus = 0;
             this.router.navigate(['/zacks-stock-ticker-list', { type: "all"}]);

            }
          });
        }  else{
          this.presentAdAlert();

        }
      });
    });
  }
  async navigateToZacksRankList(rank){
    this.currentUrlArray = ['/zacks-stock-ticker-list', { type: "rank", rank : rank }];
this.pagestatus = 0;
    await this.favoritesService.getRewardCredits().then(credit =>{
      if(credit > 6){
        this.favoritesService.clearRewardCredit();
      }
      this.favoritesService.getRewardCredits().then(credit =>{
        if(credit == 1 || credit == 2 ){
          this.adService.prepareRewardVideoAds();
        }
        if(credit != 6){
          this.favoritesService.incrementRewardsCredit().then(count =>{
            if(credit === 6){
              this.presentAdAlert();
            }else{
              this.pagestatus = 0;
              this.router.navigate(['/zacks-stock-ticker-list', { type: "rank", rank : rank }]);

            }
          });
        }  else{
          this.presentAdAlert();

        }
      });
    });

  }
  async navigateToZacksRankThroughIndustry(industryName){
    this.currentUrlArray = ['/zacks-stock-ticker-list', { type: "industry", industryName : industryName }];
this.pagestatus = 0;
    await this.favoritesService.getRewardCredits().then(credit =>{
      if(credit > 6){
        this.favoritesService.clearRewardCredit();
      }
      this.favoritesService.getRewardCredits().then(credit =>{
        if(credit == 1 || credit == 2 ){
          this.adService.prepareRewardVideoAds();
        }
        if(credit != 6){
          this.favoritesService.incrementRewardsCredit().then(count =>{
            if(credit === 6){
              this.presentAdAlert();
            }else{
              this.pagestatus = 0;
              this.router.navigate(['/zacks-stock-ticker-list', { type: "industry", industryName : industryName }]);

            }
          });
        }  else{
          this.presentAdAlert();

        }
      });
    });

  }

  async navigateToZacksRankChanges(){
    this.currentUrlArray = ['/zacksrankchanges'];
    this.pagestatus = 0;
    await this.favoritesService.getRewardCredits().then(credit =>{
      if(credit > 6){
        this.favoritesService.clearRewardCredit();
      }
      this.favoritesService.getRewardCredits().then(credit =>{
        if(credit == 1 || credit == 2 ){
          this.adService.prepareRewardVideoAds();
        }
        if(credit != 6){
          this.favoritesService.incrementRewardsCredit().then(count =>{
            if(credit === 6){
              this.presentAdAlert();
            }else{
              this.pagestatus = 0;
              this.router.navigate(['/zacksrankchanges']);

            }
          });
        }  else{
          this.presentAdAlert();

        }
      });
    });

  }
  ionViewWillEnter(){
    this.adService.showBannerAd();
  }

  navigateToStockDetails(tickerName,rank,industry,lastprice,logo,companyname){
    this.router.navigate(['/stockdetailpage', { tickerName: tickerName,
     rank : rank, industry : industry, lastprice : lastprice, logo : logo,
   companyname : companyname}]);

  }

}
