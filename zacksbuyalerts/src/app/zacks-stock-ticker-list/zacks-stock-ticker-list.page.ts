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
import { ModalController } from '@ionic/angular';
import { FiltermodalPage } from '../filtermodal/filtermodal.page';
import * as timeago from 'timeago.js'
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';



@Component({
  selector: 'app-zacks-stock-ticker-list',
  templateUrl: './zacks-stock-ticker-list.page.html',
  styleUrls: ['./zacks-stock-ticker-list.page.scss'],
})
export class ZacksStockTickerListPage implements OnInit {
 zacksRank:any;
 type:any;
 industryName:any;
 searchRank:any;
 zacksList:any;
 tickerName:any;
 pageNo:any;
 index:any;
 loading:any;
 tickerchars:any;
 deviceid:any = "";
 username:any = "";
 toast:any;
 public selectedFilterParams = {
   "tickerName": "",
   "selectedZacksRanks" : [],
   "selectedIndustries" : [],
   "priceRangeSelection" : 0
 }
filterQuery:any;
appurl = "http://139.59.12.180/";
errorLogo:any;
creditCount:any;
  constructor(private route: ActivatedRoute,
    private router: Router, private dataService: FetchDataService, private favoritesService : FavoritesService,
  public loadingService : LoadingServiceService,public alertController: AlertController,private adService : GoogleAdDisplayService,
  public toastController: ToastController, private platform : Platform, private loadingController:LoadingController,
  private network:Network, private modalController: ModalController,
  private uniqueDeviceID: UniqueDeviceID) {
  }

  async ngOnInit() {
    this.adService.showInterstitialAds();

    await this.setUserName();
    await this.setdeviceid();
    this.errorLogo = this.appurl + "zacksalerts/min/404.jpg";
    this.tickerName = "";
    this.pageNo = 1;
    this.type = this.route.snapshot.paramMap.get('type');
    if(this.type === "industry"){
      this.industryName = this.route.snapshot.paramMap.get('industryName');
      this.selectedFilterParams.selectedIndustries.push(this.industryName);
      this.loadFilteredData();
    }else if(this.type === "rank"){
      this.searchRank = this.route.snapshot.paramMap.get('rank');
      this.selectedFilterParams.selectedZacksRanks.push(this.searchRank);
      this.loadFilteredData();
    }else if(this.type === "all"){
      this.loadFilteredData();
    }

    //this.zacksRank = this.route.snapshot.paramMap.get('rank');

  /*  this.dataService.getZacksRankList(this.zacksRank,1).subscribe((data:any[]) => {
      this.zacksList = data;
      var i =0;
      this.index = 0;

     this.loadingDismiss();
   });*/
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

addToWatchList(tickername){
  this.dataService.addToWatchList(tickername,this.username,this.deviceid).subscribe((data:any[]) => {
  });
  for(var i=0;i<this.zacksList.length;i++){
    if(this.zacksList[i].tickerName === tickername){
      this.zacksList[i].isWatched = true;
      this.showAddRemoveWatchlistToast("Ticker '"+tickername+"' added to watchlist. We will notify you when zacks rank for this ticker changes.");
    }
  }

}

removeFromWatchList(tickername){
  this.dataService.removeFromWatchList(tickername,this.username,this.deviceid).subscribe((data:any[]) => {
  });

  for(var i=0;i<this.zacksList.length;i++){
    if(this.zacksList[i].tickerName === tickername){
      this.zacksList[i].isWatched = false;
      this.showAddRemoveWatchlistToast("Ticker '"+tickername+"' removed from watchlist.");
    }
  }
}

showAddRemoveWatchlistToast(message) {
  this.toast = this.toastController.create({
    message: message,
    duration: 3200,
    color:'medium',
    translucent:true,
    animated:true
  }).then((toastData)=>{
    toastData.present();
  });
}


  async loadData(event) {
this.pageNo = this.pageNo + 1;
setTimeout(() => {
/*  this.dataService.getZacksRankList(this.zacksRank,this.pageNo).subscribe((data:any[]) => {
      for (let i = 0; i < data.length; i++) {
        this.zacksList.push(data[i]);
      }
*/
this.dataService.applyFilter(this.selectedFilterParams,this.pageNo,this.username,this.deviceid).subscribe((data:any[]) => {
  for (let i = 0; i < data.length; i++) {
    this.zacksList.push(data[i]);
  }
});
  event.target.complete();
}, 1200);
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



showfilterModal(){
this.presentModal();
}

async presentModal() {
  const modal = await this.modalController.create({
    component: FiltermodalPage,
    componentProps: { data: this.selectedFilterParams },
    cssClass: 'my-custom-class'
  });

  modal.onDidDismiss()
     .then((res) => {
       if(res){
         this.selectedFilterParams.selectedZacksRanks = res.data.selectedZacksRanks;
         this.selectedFilterParams.selectedIndustries = res.data.selectedIndustries;
         this.selectedFilterParams.priceRangeSelection = res.data.priceRangeSelection;
         this.loadFilteredData();
       }
   });
  return await modal.present();
}

loadFilteredData(){
//  if(this.selectedFilterParams && (this.selectedFilterParams.selectedZacksRanks.length != 0
//|| this.selectedFilterParams.selectedIndustries.length != 0)){
    this.pageNo = 1;
    this.loadingPresent("Please wait.. loading..");
    this.dataService.applyFilter(this.selectedFilterParams,1,this.username,this.deviceid).subscribe((data:any[]) => {
      this.zacksList = data;
      var i =0;
      this.index = 0;
      //console.log(this.zacksList);
      this.loadingDismiss();
    });

//  }else{
  //  this.pageNo = 1;
  //  this.dataService.getZacksRankList(this.zacksRank,this.pageNo).subscribe((data:any[]) => {
  //    this.zacksList = data;
  //    this.loadingDismiss();
  //  });

//  }

}
onKeyPress(tickerChars){
  if(tickerChars){
    if(tickerChars.length >=2 ){
    this.selectedFilterParams.tickerName = tickerChars;
    this.loadFilteredData();
  }
}else if(tickerChars.length === 0){
    this.selectedFilterParams.tickerName = tickerChars;
    this.loadFilteredData();
  }


}

navigateToStockDetails(tickerName,rank,industry,lastprice,logo,companyname){
  this.router.navigate(['/stockdetailpage', { tickerName: tickerName,
   rank : rank, industry : industry, lastprice : lastprice, logo : logo,
 companyname : companyname}]);

}

}
