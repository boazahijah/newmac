import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { IonicModule } from '@ionic/angular';
import { SongdetailsPage } from './songdetails.page';

const routes: Routes = [
  {
    path: '',
    component: SongdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SongdetailsPage]
})
export class SongdetailsPageModule {}
