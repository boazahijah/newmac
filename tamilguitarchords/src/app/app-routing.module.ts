import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/menu/home', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'songlist', loadChildren: './songlist/songlist.module#SonglistPageModule' },
  { path: 'songdetails', loadChildren: './songdetails/songdetails.module#SongdetailsPageModule' },
  { path: 'favoritescreen', loadChildren: './favoritescreen/favoritescreen.module#FavoritescreenPageModule' },
  { path: 'favoritescreen-details', loadChildren: './favoritescreen-details/favoritescreen-details.module#FavoritescreenDetailsPageModule' },
  { path: 'song-request', loadChildren: './song-request/song-request.module#SongRequestPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
