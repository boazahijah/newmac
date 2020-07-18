import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { LoadingServiceService } from '../loading-service.service';
import { Storage } from '@ionic/storage';
import { FavoritesService } from '../favorites.service';
import { ActivatedRoute, Router } from '@angular/router';

const FAV_STORAGE_KEY = 'favouriteSongs';

@Component({
  selector: 'app-favoritescreen-details',
  templateUrl: './favoritescreen-details.page.html',
  styleUrls: ['./favoritescreen-details.page.scss'],
})
export class FavoritescreenDetailsPage implements OnInit {
  songName : any;
  songkey : any;
  songDetails : any;
  pallavi = [];
  saranam = [];
  tips = [];
  videoDetails = [];

  chordDetails : any;

  constructor(private route: ActivatedRoute,private youtube: YoutubeVideoPlayer,
private loadingService : LoadingServiceService, private favoritesService : FavoritesService) { }

  ngOnInit() {
    this.loadingService.showLoader();
    this.songName = this.route.snapshot.paramMap.get('songName');
    this.favoritesService.getSongDetail(this.songName).then(data => {
      console.log(data);
        this.songDetails = data;
        this.songkey = this.songDetails.songkey;
        this.tips.push(...this.songDetails.songTips);
        this.videoDetails.push(...this.songDetails.videodetails);

        for (let pallavi of this.songDetails.pallaviDetails) {
          this.pallavi.push(pallavi.pallavilyric.replace(/\(/g, '<b>(').replace(/\)/g, ')</b>'));
        }
        for (let saranam of this.songDetails.saranamDetails) {
          this.saranam.push(saranam.saranamlyric.replace(/\(/g, '<b><i>(').replace(/\)/g, ')</i></b>&nbsp;&nbsp;').replace(/\[/g, '<b><i>[').replace(/\]/g, ']</i></b>&nbsp;&nbsp;'));
        }
        this.chordDetails = this.songDetails.chordDetails;
        this.loadingService.hideLoader();
      });
  }

  openYoutubeVideo(videoid){
    this.youtube.openVideo(videoid);

  }

}
