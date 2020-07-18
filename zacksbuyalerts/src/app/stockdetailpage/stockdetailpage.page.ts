import { Component, OnInit,ViewChild } from '@angular/core';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { SuperTabChangeEventDetail } from '@ionic-super-tabs/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';
import { LoadingController } from '@ionic/angular';
import { GoogleAdDisplayService } from '../google-ad-display.service';

@Component({
  selector: 'app-stockdetailpage',
  templateUrl: './stockdetailpage.page.html',
  styleUrls: ['./stockdetailpage.page.scss'],
})
export class StockdetailpagePage implements OnInit {
  @ViewChild('SuperTabs', { static: false}) st: SuperTabs;
  activeTabIndex: number;
  loading:any;

  tickerName:any;
  rank:any;
  companyname:any;
  industry:any;
  lastprice:any;
  logo:any;
  companyFinancials = {
    bullishPercent : "0.0",
    bearishPercent : "0.0",
    sectorAverageBullishPercent : "0.0"
  };

  formatSubtitle = (percent: number) : string => {
    if(percent >= 50){
      return "Bullish!"
    }else if(percent < 50){
      return "Bearish"
    }
  }
  constructor(private route: ActivatedRoute,
    private router: Router,private dataService: FetchDataService,
    public loadingController: LoadingController, public adService :GoogleAdDisplayService) { }
  onTabChange(ev: CustomEvent<SuperTabChangeEventDetail>) {
    this.activeTabIndex = ev.detail.index;

  }

  ngOnInit() {
    this.adService.showInterstitialAds();

    this.tickerName = this.route.snapshot.paramMap.get('tickerName');
    this.rank = this.route.snapshot.paramMap.get('rank');
    this.companyname = this.route.snapshot.paramMap.get('companyname');
    this.industry = this.route.snapshot.paramMap.get('industry');
    this.lastprice = this.route.snapshot.paramMap.get('lastprice');
    this.logo = this.route.snapshot.paramMap.get('logo');
    this.getCompanyFinancials();
}
getCompanyFinancials(){
  this.showLoader("Loading..Please wait..");
  this.dataService.getCompanyFinancials(this.tickerName).subscribe((data) => {
    if(data){
        this.companyFinancials = data[0];
        if(this.companyFinancials){
        if(this.companyFinancials.bullishPercent){
          this.companyFinancials.bullishPercent = String(parseFloat(this.companyFinancials.bullishPercent) * 100);
        }
        if(this.companyFinancials.bearishPercent){
          this.companyFinancials.bearishPercent = String(parseFloat(this.companyFinancials.bearishPercent) * 100);
        }
        if(this.companyFinancials.bullishPercent && !this.companyFinancials.bearishPercent){
          this.companyFinancials.bearishPercent = "0.01";
        }
        if(this.companyFinancials.sectorAverageBullishPercent){
          this.companyFinancials.sectorAverageBullishPercent = String(parseFloat(this.companyFinancials.sectorAverageBullishPercent) * 100);
        }
      }
    }
    this.hideLoader();
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
}
