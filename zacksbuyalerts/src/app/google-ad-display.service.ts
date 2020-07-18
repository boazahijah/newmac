import { Injectable } from '@angular/core';
import {rewardvideo} from 'cordova-plugin-admob-free/www/admob'
import { LoadingServiceService } from './loading-service.service';

import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';

@Injectable({
  providedIn: 'root'
})
export class GoogleAdDisplayService {

  constructor(private admobFree: AdMobFree,private loadingService:LoadingServiceService) { }

  showBannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false, // Remove in production
        autoShow: true,//,
        id: "ca-app-pub-3559235060932350/1596761006"
        //id : "ca-app-pub-3940256099942544/6300978111"
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
}



showInterstitialAds(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: false, // Remove in production
        autoShow: true,//,
       id: "ca-app-pub-3559235060932350/7635270339"
      //id: "ca-app-pub-3940256099942544/1033173712"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => console.log(e));
}

prepareRewardVideoAds(){
    let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
        isTesting: false, // Remove in production
        autoShow: false,//,
        id: "ca-app-pub-3559235060932350/2335127603"
        //id: "ca-app-pub-3940256099942544/5224354917"


    };
    this.admobFree.rewardVideo.config(RewardVideoConfig);
    this.admobFree.rewardVideo.prepare();
    //.then(() => {
    //}).catch(e => alert(e));
}

prepareRewardVideoAdsOkButton(){
    let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
        isTesting: false, // Remove in production
        autoShow: false,//,
        id: "ca-app-pub-3559235060932350/2335127603"
        //id: "ca-app-pub-3940256099942544/5224354917"
    };
    this.admobFree.rewardVideo.config(RewardVideoConfig);
    return this.admobFree.rewardVideo.prepare();
    //.then(() => {
    //}).catch(e => alert(e));
}

showRewardVideoAds(){
  let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
          isTesting: false, // Remove in production
          autoShow: false,//,
          id: "ca-app-pub-3559235060932350/2335127603"
          //id: "ca-app-pub-3940256099942544/5224354917"
      };
      this.admobFree.rewardVideo.config(RewardVideoConfig);
      this.admobFree.rewardVideo.isReady().then((isReady)=>{
        if(isReady){
          this.admobFree.rewardVideo.show();
        }else{
         this.admobFree.rewardVideo.prepare().then(()=>{
            this.admobFree.rewardVideo.isReady().then((isReady)=>{
              this.admobFree.rewardVideo.show();
            });
          });
        }
      });}

    showRewardVideoAdsIfNotReady(){
        let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
                isTesting: false, // Remove in production
                autoShow: true,//,
                id: "ca-app-pub-3559235060932350/2335127603"
                //id: "ca-app-pub-3940256099942544/5224354917"
            };
            this.admobFree.rewardVideo.config(RewardVideoConfig);
            return this.admobFree.rewardVideo.prepare().then(()=>{
          //  return   this.admobFree.rewardVideo.isReady();
            //.then((isReady)=>{

              // });
             });
           }

          isVideoAdReady(){
            let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
                    isTesting: false, // Remove in production
                    autoShow: false,//,
                    id: "ca-app-pub-3559235060932350/2335127603"
                    //id: "ca-app-pub-3940256099942544/5224354917"
            };
                this.admobFree.rewardVideo.config(RewardVideoConfig);
                return this.admobFree.rewardVideo.isReady();
              }

              isVideoAdReadyResponse(){
                let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
                        isTesting: false, // Remove in production
                        autoShow: false,//,
                        id: "ca-app-pub-3559235060932350/2335127603"
                        //id: "ca-app-pub-3940256099942544/5224354917"
                };
                    this.admobFree.rewardVideo.config(RewardVideoConfig);
                    return this.admobFree.rewardVideo.isReady();

                  }

              }
