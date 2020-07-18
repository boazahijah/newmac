import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { GoogleAdDisplayService } from '../google-ad-display.service';
import { LoadingController } from '@ionic/angular';
import * as timeago from 'timeago.js'
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { FavoritesService } from '../favorites.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-zacksrankchanges',
  templateUrl: './zacksrankchanges.page.html',
  styleUrls: ['./zacksrankchanges.page.scss'],
})
export class ZacksrankchangesPage implements OnInit {
recentChanges:any;
loading:any;
appurl = "http://139.59.12.180/";
errorLogo:any;
changeTickers:any = [];
pageNo = 0;
deviceid:any = "";
username:any = "";
toast:any;

  constructor(private dataService : FetchDataService,
    private loadingController : LoadingController,
  private uniqueDeviceID: UniqueDeviceID,
private favoritesService : FavoritesService,
public toastController: ToastController,private route: ActivatedRoute,
  private router: Router, private adService:GoogleAdDisplayService,
private platform:Platform, private alertController : AlertController) {
 }
  async ngOnInit() {
    this.showLoader("Loading..Please wait..");
    this.adService.showInterstitialAds();

    await this.setUserName();
    await this.setdeviceid();
    this.errorLogo = this.appurl + "zacksalerts/min/404.jpg";
    this.dataService.getRecentZacksRankChanges(this.pageNo,this.username,this.deviceid).subscribe((data:any) => {
      if(data){
        this.recentChanges = data;
        this.recentChanges.recentchangetext = timeago.format(data.dateofchange);
        for(var i=0; i< this.recentChanges.changetickers.length; i++){
        this.changeTickers.push(this.recentChanges.changetickers[i]);
        }
        console.log(this.changeTickers);
      }
this.hideLoader();
    });
  }
  async loadData(event) {
  this.pageNo = this.pageNo + 1;

  setTimeout(() => {
    this.dataService.getRecentZacksRankChanges(this.pageNo,this.username,this.deviceid).subscribe((data:any) => {
      if(data){
        for(var i=0; i< data.changetickers.length; i++){
        this.changeTickers.push(data.changetickers[i]);
        }
      }
this.hideLoader();
    });

  event.target.complete();
  }, 500);
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
   for(var i=0;i<this.changeTickers.length;i++){
     if(this.changeTickers[i].tickerName === tickername){
       this.changeTickers[i].isWatched = true;
       this.showAddRemoveWatchlistToast("Ticker '"+tickername+"' added to watchlist. We will notify you when zacks rank for this ticker changes.");
     }
   }

 }

 removeFromWatchList(tickername){
   this.dataService.removeFromWatchList(tickername,this.username,this.deviceid).subscribe((data:any[]) => {
   });

   for(var i=0;i<this.changeTickers.length;i++){
     if(this.changeTickers[i].tickerName === tickername){
       this.changeTickers[i].isWatched = false;
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

 navigateToStockDetails(tickerName,rank,industry,lastprice,logo,companyname){
   this.router.navigate(['/stockdetailpage', { tickerName: tickerName,
    rank : rank, industry : industry, lastprice : lastprice, logo : logo,
  companyname : companyname}]);

 }


}
