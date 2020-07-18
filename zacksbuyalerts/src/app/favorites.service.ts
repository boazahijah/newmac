import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FetchDataService } from './fetch-data.service';

const   STORAGE_KEY = 'favouriteSongs';
const   INTER_CREDITS_KEY = 'interAdTotalCredits';
const   REWARD_CREDITS_KEY = 'rewardAdTotalCredits';
const   USERNAME = 'username';
const   DEVICEID = 'deviceid';
const   APPRATE = 'apprate';



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
songDetails : any;
isFirstTime: true;
  constructor(public storage : Storage, private dataService : FetchDataService) { }

  isFavorite(songName, index) {
     return this.getAllFavoriteSongs().then(result => {
       if(result){
      for(let i = 0 ; i < result.length; i++) {
          if(result[i].songname == songName){
            return {
              "index":index, "isFav":true
            };
          }
      }
    }
      return {
        "index":index, "isFav":false
      };    });
  }

  favoriteSong(songDetails) {
    this.songDetails = songDetails;
    return  this.getAllFavoriteSongs().then(result => {
        if (result) {
            if(!this.isAlreadyPresentInFavorites(result, this.songDetails.songname)){
              result.push(this.songDetails);
              return this.storage.set(STORAGE_KEY, result);
            }else{
              return result;
            }
      } else {
           return this.storage.set(STORAGE_KEY, [this.songDetails]);
       }
    });

   }


   isAlreadyPresentInFavorites(result, songname){
     for(let i = 0 ; i < result.length; i++) {
         if(result[i].songname == songname){
           return true;
         }
     }
     return false;
   }

  unfavoriteSong(songName) {
    return this.getAllFavoriteSongs().then(result => {
      if (result) {
        for(let i = 0 ; i < result.length; i++) {
            if(result[i].songname == songName){
              result.splice(i, 1);
              return this.storage.set(STORAGE_KEY, result);
            }
        }
      }
    });
  }

clearStorage(){
  this.storage.clear();
}
  getAllFavoriteSongs() {
  //  this.storage.clear();
    return this.storage.get(STORAGE_KEY);
  }

  getListOfAllFavouriteSongs(){
   return this.getAllFavoriteSongs().then(result => {
      return result;
    });

  }

  getSongDetail(songName){
    return this.getListOfAllFavouriteSongs().then(result => {
      if(result != null && result.length != 0){
        for(let i = 0 ; i < result.length; i++) {
          if(result[i].songname == songName){
          return result[i];
        }
      }
      }
    });
  }

  getInterstitialCredits() {
    return this.storage.get(INTER_CREDITS_KEY);
  }

  incrementInterstitialCredit() {
    var credits = 0;
    return  this.getInterstitialCredits().then(creditcount => {
      if(creditcount){
        credits = creditcount + 1;
        return this.storage.set(INTER_CREDITS_KEY, credits);
      }else{
        return this.storage.set(INTER_CREDITS_KEY, 1);
      }
    });
  }

  clearInterstitialCredit() {
        return this.storage.set(INTER_CREDITS_KEY, 1);
  }

  getRewardCredits() {
    return this.storage.get(REWARD_CREDITS_KEY);
  }

  incrementRewardsCredit() {
    var credits = 0;
    return  this.getRewardCredits().then(creditcount => {
      if(creditcount){
        credits = creditcount + 1;
        return this.storage.set(REWARD_CREDITS_KEY, credits);
      }else{
        return this.storage.set(REWARD_CREDITS_KEY, 1);
      }
    });
  }

  clearRewardCredit() {
         this.storage.set(REWARD_CREDITS_KEY, 1);
  }

  setUserName(username) {
        return this.storage.set(USERNAME, username);
  }

  getUserName() {
    return this.storage.get(USERNAME);
  }

  setDeviceid(_deviceid) {
        return this.storage.set(DEVICEID, _deviceid);
  }

  getDeviceid() {
    return this.storage.get(DEVICEID);
  }

  setIsAppRated(apprate) {
        return this.storage.set(APPRATE, apprate);
  }

  getIsAppRated() {
    return this.storage.get(APPRATE);
  }


}
