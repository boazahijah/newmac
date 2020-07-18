import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ZacksrankchangesPage } from './zacksrankchanges.page';

const routes: Routes = [
  {
    path: '',
    component: ZacksrankchangesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ZacksrankchangesPage]
})
export class ZacksrankchangesPageModule {}
