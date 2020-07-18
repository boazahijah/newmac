import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { IonicModule } from '@ionic/angular';

import { FavoritescreenDetailsPage } from './favoritescreen-details.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritescreenDetailsPage
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
  declarations: [FavoritescreenDetailsPage]
})
export class FavoritescreenDetailsPageModule {}
