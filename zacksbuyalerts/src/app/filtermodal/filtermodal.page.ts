import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { FavoritesService } from '../favorites.service';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filtermodal',
  templateUrl: './filtermodal.page.html',
  styleUrls: ['./filtermodal.page.scss'],
})
export class FiltermodalPage implements OnInit {
  public zacksRanks = [
        { val: 'Strong Buy', isChecked: false },
        { val: 'Buy', isChecked: false },
        { val: 'Hold', isChecked: false },
        { val: 'Sell', isChecked: false },
        { val: 'Strong Sell', isChecked: false }
      ];
  public selectedZacksRank:any = [];
  public industryNames=[];
  public selectedIndustry:any = [];
  public priceRange:any;
  public selectedFilterParams = {
    "selectedZacksRanks" : [],
    "selectedIndustries" : [],
    "priceRangeSelection" : 0
  }
  constructor(private dataService: FetchDataService, private favoritesService : FavoritesService,
  public viewCtrl: ModalController,navParams: NavParams) {
    this.selectedFilterParams = navParams.get('data');
    if(this.selectedFilterParams){
      if(this.selectedFilterParams.selectedIndustries){
        this.selectedIndustry = this.selectedFilterParams.selectedIndustries;
      }
      if(this.selectedFilterParams.selectedZacksRanks){
        this.selectedZacksRank = this.selectedFilterParams.selectedZacksRanks;
      }
      if(this.selectedFilterParams.priceRangeSelection){
        this.priceRange = this.selectedFilterParams.priceRangeSelection;
      }else{
        this.priceRange = 0;
      }

    }
  }

  ngOnInit() {
    this.dataService.getIndustryNamesMaster().subscribe((data:any) => {
      this.industryNames = data;
    });
  }

  dismissModal(){
    this.selectedFilterParams.selectedZacksRanks = this.selectedZacksRank;
    this.selectedFilterParams.selectedIndustries = this.selectedIndustry;
    this.selectedFilterParams.priceRangeSelection = this.priceRange;
    this.viewCtrl.dismiss(this.selectedFilterParams);
}

closeModal(){
  this.viewCtrl.dismiss(this.selectedFilterParams);
}

}
