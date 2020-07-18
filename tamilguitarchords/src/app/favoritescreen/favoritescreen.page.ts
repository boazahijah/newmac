import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favoritescreen',
  templateUrl: './favoritescreen.page.html',
  styleUrls: ['./favoritescreen.page.scss'],
})
export class FavoritescreenPage implements OnInit {
  songList = [];
  toast:any;

  constructor(private route: ActivatedRoute,
    private router: Router, private dataService: FetchDataService, private favoritesService : FavoritesService,public toastController: ToastController) {

  }

  ngOnInit() {
    this.favoritesService.getAllFavoriteSongs().then(result => {
      console.log(result);
      this.songList = result;
  });
}

removeFromFavourites(index){

  this.favoritesService.unfavoriteSong(this.songList[index].songname).then(data=> {
    this.songList = data;
    this.showRemoveFromFavToast();
  });
}

navigateToSongList(songName){
  this.router.navigate(['/favoritescreen-details', { songName: songName }]);
}

showRemoveFromFavToast() {
  this.toast = this.toastController.create({
    message: 'Song removed from your favorites.',
    duration: 2000,
    color:'secondary',
    translucent:true,
    animated:true
  }).then((toastData)=>{
    toastData.present();
  });
}
hideToast(){
  this.toast = this.toastController.dismiss();
}


}
