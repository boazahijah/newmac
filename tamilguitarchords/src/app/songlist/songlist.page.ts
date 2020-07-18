import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';
import { FavoritesService } from '../favorites.service';
import { LoadingServiceService } from '../loading-service.service';
import { AlertController } from '@ionic/angular';
import { GoogleAdDisplayService } from '../google-ad-display.service';
import {rewardvideo} from 'cordova-plugin-admob-free/www/admob'
import { ToastController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
const FAV_STORAGE_KEY = 'favouriteSongs';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './songlist.page.html',
  styleUrls: ['./songlist.page.scss'],
})


export class SonglistPage implements OnInit {

@ViewChild(IonInfiniteScroll,{static: false}) infiniteScroll: IonInfiniteScroll;
songchars: any;
pageNo :any;
langName : any;
songList = [];
songListFavouritesAttrAdded = [];
favourites = [];
isExistsFavourites = [];
index = 0;
toast:any;
songName:any;
loading:any;
adfailind = 0;
constructor(private route: ActivatedRoute,
  private router: Router, private dataService: FetchDataService, private favoritesService : FavoritesService,
public loadingService : LoadingServiceService,public alertController: AlertController,private adService : GoogleAdDisplayService,
public toastController: ToastController, private platform : Platform, private loadingController:LoadingController,
private network:Network) {
this.initializeApp();
}

ionViewDidLeave() {
  this.loadingDismiss();
}

async loadingPresent(message: string = null) {
    this.loading = await this.loadingController.create({
        message: message });
    return await this.loading.present();
}
async loadingDismiss() {
    setTimeout(() => {
        return this.loading.dismiss();
    }, 1000);
}


ngOnInit() {
  this.adService.prepareRewardVideoAds();
  this.loadingPresent("Please wait.. loading..");
  this.songchars = "";
    this.pageNo = 1;
    this.langName = "Tamil Songs"
    this.dataService.getSongsList(this.langName,1).subscribe((data:any[]) => {
      //data has a list of songs - 25 limit
      this.songList = data;
      var i =0;
      this.index = 0;
    for(i=0;i<this.songList.length;i++) {
      this.favoritesService.isFavorite(this.songList[i].songName, i).then(booleanIsFav => {
//console.log(booleanIsFav);
        this.songList[booleanIsFav.index].isFavorite = booleanIsFav.isFav;
      //  console.log(this.songList[booleanIsFav.index]);

      });
    }
    this.loadingDismiss();

    //this.songList = data;
  });
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


  loadData(event) {
  this.pageNo = this.pageNo + 1;
  setTimeout(() => {
    this.dataService.getSongsList(this.langName,this.pageNo).subscribe((data:any[]) => {
        for (let i = 0; i < data.length; i++) {
          this.songList.push(data[i]);
        }
});
    event.target.complete();
  }, 500);
}


async  presentAlert(songName){
const alert = await this.alertController.create({
header: 'Credits expired !',
subHeader:'Please watch a video ad to reload the credits.',
message: 'As Ads are our only source of revenue, we wil feel grateful if you spend 30 seconds watching the ad,! Thank you.',
buttons: [
{
    text: 'Ok',
    handler: () => {
      this.adService.isVideoAdReady().then((isReady) => {
        if(isReady == "true"){
          this.adService.showRewardVideoAds();
        }else{
          this.loadingPresent("Loading ad..Please wait..");
          this.adService.showRewardVideoAdsIfNotReady().then(()=>{
            this.loadingDismiss();
          });
        }
      });

      /*  if(this.adService.isVideoAdReady()){
          this.adService.showRewardVideoAds();
        }else{
        }
*/
      }
    }

]
});

await alert.present();
}
initializeApp(){
  this.platform.ready().then(() => {

    document.addEventListener('admob.rewardvideo.events.REWARD', () => {
      this.loadingDismiss();

      this.favoritesService.clearRewardCredit();
        this.router.navigate(['/songdetails', { songName: this.songName }]);
    });

    document.addEventListener('admob.rewardvideo.events.CLOSE', () => {
      this.loadingDismiss();

      this.adService.prepareRewardVideoAds();
  });
    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', () => {
      this.loadingDismiss();
      //this.adService.prepareRewardVideoAds();
      this.adfailind = 0;
      if(this.songName && this.songName != ""){
        this.router.navigate(['/songdetails', { songName: this.songName }]);
      }
    });

});
}

navigateToSongList(songName){
this.adfailind = 1;
  this.songName = songName;
    this.favoritesService.getRewardCredits().then(credit =>{
      if(credit > 6){
        this.favoritesService.clearRewardCredit();
      }
      this.favoritesService.getRewardCredits().then(credit =>{
        if(credit == 1 || credit == 2 ){
          this.adService.prepareRewardVideoAds();
        }
        if(credit != 6){
          this.favoritesService.incrementRewardsCredit().then(count =>{
            if(count == 6){
              this.presentAlert(songName);
            }else{
              this.favoritesService.incrementInterstitialCredit().then(count =>{
                this.router.navigate(['/songdetails', { songName: songName }]);
              });
            }
          });
        }  else{
          this.presentAlert(songName);
        }
      });
    });

    this.dataService.incrementHits(songName,this.langName).subscribe((data:any[]) => {

});


}



toggleInfiniteScroll() {
  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
}
addRemoveFavourites(index){
  this.favoritesService.isFavorite(this.songList[index].songName, index).then(booleanIsFav => {
    if(booleanIsFav.isFav){
      this.removeFromFavourites(this.songList[index].songName);
      this.songList[index].isFavorite = false;
    }else{
      this.addToFavourites(this.songList[index].songName);
      this.songList[index].isFavorite = true;

    }
  });
}

addToFavourites(songName){
    this.dataService.getSongDetails(songName).subscribe((songDetails) => {
      this.dataService.getChordDetails(songName).subscribe((data) => {
        songDetails[0].chordDetails = data;
        this.favoritesService.favoriteSong(songDetails[0]).then(data=> {
          this.showAddtoFavToast();
        });
      });
    });
}

removeFromFavourites(songName){
  this.favoritesService.unfavoriteSong(songName).then(data=> {
    this.showRemoveFromFavToast();
    //console.log(data);
  });
}
onKeyPress(songchars){
  if(this.songchars.length >= 3){
    this.filterSongs();
  }else if(this.songchars.length == 0){
      this.filterSongs();
  }
}
filterSongs(){
  this.loadingPresent("Please wait.. loading..");
    this.pageNo = 1;
    this.dataService.getFilteredSongsList(this.langName,1,this.songchars).subscribe((data:any[]) => {
      //data has a list of songs - 25 limit
      this.songList = data;
      var i =0;
      this.index = 0;
    for(i=0;i<this.songList.length;i++) {
      this.favoritesService.isFavorite(this.songList[i].songName, i).then(booleanIsFav => {
        //console.log(booleanIsFav);
        this.songList[booleanIsFav.index].isFavorite = booleanIsFav.isFav;
      });
    }
    this.loadingDismiss();
  });
}

showAddtoFavToast() {
  this.toast = this.toastController.create({
    message: 'Song added to your favorites.',
    duration: 2000,
    color:'secondary',
    translucent:true,
    animated:true
  }).then((toastData)=>{
    toastData.present();
  });
}
showRemoveFromFavToast() {
  this.toast = this.toastController.create({
    message: 'Song removed from your favorites.',
    duration: 2000,
    color:'secondary',
    translucent:true,
    animated:true
  }).then((toastData)=>{
    toastData.present();
  });
}
hideToast(){
  this.toast = this.toastController.dismiss();
}

}
