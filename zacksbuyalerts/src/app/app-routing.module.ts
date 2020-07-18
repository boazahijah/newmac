import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/menu/home', pathMatch: 'full' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'zacks-stock-ticker-list', loadChildren: './zacks-stock-ticker-list/zacks-stock-ticker-list.module#ZacksStockTickerListPageModule' },
  { path: 'filtermodal', loadChildren: './filtermodal/filtermodal.module#FiltermodalPageModule' },
  { path: 'stockdetailpage', loadChildren: './stockdetailpage/stockdetailpage.module#StockdetailpagePageModule' },
  { path: 'zacksrankchanges', loadChildren: './zacksrankchanges/zacksrankchanges.module#ZacksrankchangesPageModule' },
  { path: 'disclaimer', loadChildren: './disclaimer/disclaimer.module#DisclaimerPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
