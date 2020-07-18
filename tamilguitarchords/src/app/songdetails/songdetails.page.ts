import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { LoadingServiceService } from '../loading-service.service';
import { FavoritesService } from '../favorites.service';
import { GoogleAdDisplayService } from '../google-ad-display.service';
import { LoadingController } from '@ionic/angular';
import { SuperTabs } from '@ionic-super-tabs/angular';
import * as timeago from 'timeago.js'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { SuperTabChangeEventDetail } from '@ionic-super-tabs/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-songdetails',
  templateUrl: './songdetails.page.html',
  styleUrls: ['./songdetails.page.scss'],
})
export class SongdetailsPage implements OnInit {
  @ViewChild(IonInfiniteScroll,{static: false}) infiniteScroll: IonInfiniteScroll;
  pageNo :any;
  imageResponse: any;
  //options: any;
  toast:any;
  songName : any;
  songkey : any;
  songDetails : any;
  pallavi = [];
  saranam = [];
  tips = [];
  videoDetails = [];
  chordDetails : any;
  loading:any;
  isForumPage:boolean = false;
  comment:any;
  comments = [];
  commentsCount:any;
  username:any;

  @ViewChild('SuperTabs', { static: false}) st: SuperTabs;


  activeTabIndex: number;

  options = {
    // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    maximumImagesCount: 4,
    // max width and height to allow the images to be.  Will keep aspect
    // ratio no matter what.  So if both are 800, the returned image
    // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    // 800 and height 0 the image will be 800 pixels wide if the source
    // is at least that wide.
    width: 300,
   height: 300,
    // quality of resized image, defaults to 100
   //  quality: 300,
    // output type, defaults to FILE_URIs.
    // available options are
    // window.imagePicker.OutputType.FILE_URI (0) or
    // window.imagePicker.OutputType.BASE64_STRING (1)
    outputType: 1
  };

  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 1
  };


  onTabChange(ev: CustomEvent<SuperTabChangeEventDetail>) {
    this.activeTabIndex = ev.detail.index;
    if(this.activeTabIndex == 3){
      if(this.username){
      this.isForumPage = true;
      if(this.comments.length == 0){
      this.showLoader("loading comments..");
      this.dataService.getCommentsBySongNameV2(this.songName,this.pageNo).subscribe((data:any) => {
        console.log(data);
        for(var i=0;i<data.length;i++){
          data[i].lastUpdatedDesc = timeago.format(data[i].createdAt);
        }
        this.comments = data;
        this.hideLoader();
      });
    }
}else{
  this.showProfileNotUpdated();
}
    }else{
      this.isForumPage = false;
    }
  }

  constructor(private route: ActivatedRoute,
    private router: Router, private dataService: FetchDataService, private youtube: YoutubeVideoPlayer,
  private loadingService : LoadingServiceService, private favoritesService: FavoritesService,
  private adService : GoogleAdDisplayService,public alertController: AlertController,
  public loadingController: LoadingController,private imagePicker: ImagePicker,
public modalController: ModalController,public toastController: ToastController) {

  }
  async openViewer(img) {
    console.log(img);
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        srcHighRes: img
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

  async showLoader(message: string = null) {
      this.loading = await this.loadingController.create({
          message: message });
      return await this.loading.present();
  }
  async hideLoader() {
      setTimeout(() => {
          return this.loading.dismiss();
      }, 1000);
  }


  ngOnInit() {
    this.showLoader("Please wait.. loading..");
    this.songName = this.route.snapshot.paramMap.get('songName');
    this.dataService.getSongDetails(this.songName).subscribe((data) => {
      this.songDetails = data[0];
      this.songkey = this.songDetails.songkey;
      for (let tip of this.songDetails.songTips) {
        this.tips.push(tip);
      }

      for (let video of this.songDetails.videodetails) {
        this.videoDetails.push(video);
      }

      for (let pallavi of this.songDetails.pallaviDetails) {
        //this.pallavi.push(pallavi.pallavilyric.replace(/\(/g, '<b>(').replace(/\)/g, ')</b>'));

        this.pallavi.push(pallavi.pallavilyric.replace(/\(/g, '<b><i>(').replace(/\)/g, ')</i></b>&nbsp;&nbsp;').replace(/\[/g, '<b><i>[').replace(/\]/g, ']</i></b>&nbsp;&nbsp;'));
      }
      for (let saranam of this.songDetails.saranamDetails) {

        this.saranam.push(saranam.saranamlyric.replace('(', '<b><i>(').replace(')', ')</i></b>&nbsp;&nbsp;').replace(/\[/g, '<b><i>[').replace(/\]/g, ']</i></b>&nbsp;&nbsp;'));
      }
      this.hideLoader();

      this.favoritesService.getInterstitialCredits().then(count => {
        if((count) == 3){
          this.adService.showInterstitialAds();
          this.favoritesService.clearInterstitialCredit().then(data => {
          });
        }
      });
    });

    this.dataService.getChordDetails(this.songName).subscribe((data) => {
      this.chordDetails = data;
    });

    this.dataService.getCommentsCount(this.songName).subscribe((count) => {
      this.commentsCount = count;
      this.pageNo = 1;

    });
    this.favoritesService.getUserName().then((username) =>{
      /*if(!this.username){
        this.showProfileNotUpdated();
      }else{*/
      this.username = username;
      //}

    } );



}

openYoutubeVideo(videoid){
  this.youtube.openVideo(videoid);
}
ionViewWillEnter(){
  //this.adService.showBannerAd();
}
navigateToHome(){
this.router.navigate(['/']);
}

postComment(){
if(this.comment){
  this.showLoader("Posting comment..");
    this.dataService.saveComment("text",this.comment,this.username,this.songName,[]).subscribe((res:any) =>{
      res.lastUpdatedDesc = timeago.format(res.createdAt);
      this.comments.unshift(res);
      this.commentsCount = this.commentsCount + 1;
      this.comment = "";
      this.showToast("Comment posted successfully.");
      this.hideLoader();

    });
  }
}

selectImage(){
  this.imageResponse = [];

  this.imagePicker.getPictures(this.options).then((results:any) => {
    if(results.length != 0){
    for (var i = 0; i < results.length; i++) {
      const imageRes = {
        "imageComment" : ""
      };
      imageRes.imageComment = 'data:image/jpeg;base64,' + results[i];
      this.imageResponse.push(imageRes);
    }
    this.showLoader("Posting comment..");
    this.dataService.saveComment("image",this.comment,this.username,this.songName,this.imageResponse).subscribe((res:any) =>{
      res.lastUpdatedDesc = timeago.format(res.createdAt);
      this.comments.unshift(res);
      this.commentsCount = this.commentsCount + 1;
      this.comment = "";
      this.hideLoader();
      this.showToast("Comment posted successfully.");
    });
}
    });

}

showToast(message: string = null) {
  this.toast = this.toastController.create({
    message: message,
    duration: 2000,
    color:'secondary',
    translucent:true,
    animated:true
  }).then((toastData)=>{
    toastData.present();
  });
}

loadData(event) {
this.pageNo = this.pageNo + 1;
  this.dataService.getCommentsBySongNameV2(this.songName,this.pageNo).subscribe((data:any[]) => {
    for(var i=0;i<data.length;i++){
      data[i].lastUpdatedDesc = timeago.format(data[i].createdAt);
    }
    for(var i=0;i<data.length;i++){
      this.comments.push(data[i]);
    }
    event.target.complete();
  });
}

deleteComment(commentid){
  this.showDeleteConfirmation(commentid);
}

async  showDeleteConfirmation(commentid){
const alert = await this.alertController.create({
header: 'Please confirm',
//subHeader:'Please check your internet connection.',
message: 'Are you sure you want to remove this comment?',
buttons: [
{
    text: 'Yes',
    handler: () => {
      this.deleteCommentConfirm(commentid);
    }
  },{
    text: 'No',
    handler: () => {

    }
  }
]
});

await alert.present();
}

deleteCommentConfirm(commentid){
if(commentid){
  this.showLoader("Deleting comment..");
  this.dataService.removeComment(commentid).subscribe((data:any[]) => {
    for(var i=0; i<this.comments.length;i++){
      if(this.comments[i]._id === commentid){
        this.comments.splice(i, 1);
      }
    }
    this.commentsCount = this.commentsCount - 1;
    this.hideLoader();
    this.showToast("Comment removed");
  });
}
}


async  showProfileNotUpdated(){
const alert = await this.alertController.create({
header: 'Note',
subHeader:'Your profile details are incomplete.',
message: 'You have to finish updating your profile in order to use the discussion section',
buttons: [
{
    text: 'No, I wil do it later',
    handler: () => {
      //this.deleteCommentConfirm(commentid);
      this.st.selectTab(2);
    }
  },{
    text: 'Yes, Go to My Profile now',
    handler: () => {
      this.router.navigate(['/profile', { songName: "" }]);
    }
  }
]
});

await alert.present();
}


}
