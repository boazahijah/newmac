import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { IonicModule } from '@ionic/angular';
import { StockdetailpagePage } from './stockdetailpage.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: '',
    component: StockdetailpagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300    }),

    RouterModule.forChild(routes)
  ],
  declarations: [StockdetailpagePage]
})
export class StockdetailpagePageModule {}
