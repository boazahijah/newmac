import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ZacksStockTickerListPage } from './zacks-stock-ticker-list.page';
import { FiltermodalPage } from '../filtermodal/filtermodal.page';

const routes: Routes = [
  {
    path: '',
    component: ZacksStockTickerListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ZacksStockTickerListPage,FiltermodalPage],
  entryComponents:[FiltermodalPage]
})
export class ZacksStockTickerListPageModule {}
