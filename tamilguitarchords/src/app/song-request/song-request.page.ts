import { Component, OnInit } from '@angular/core';
import { AlertController,NavController } from '@ionic/angular';
import { FetchDataService } from '../fetch-data.service';


@Component({
  selector: 'app-song-request',
  templateUrl: './song-request.page.html',
  styleUrls: ['./song-request.page.scss'],
})
export class SongRequestPage implements OnInit {
  songName="";
  movieName="";
  constructor(public alertController: AlertController, private dataService: FetchDataService,
  private navCtrl : NavController) { }

async  presentAlert(){
const alert = await this.alertController.create({
header: 'Awesome!',
message: 'Your request has been <strong>sent</strong>!!!',
buttons: [
{
    text: 'Ok',
    handler: () => {
      this.navCtrl.pop();
    }
  }
]
});

await alert.present();

}

  async dataMissingAlert() {
    const alert = await this.alertController.create({
      header:"Data missing",
      animated:true,
      message: 'Please enter both the song name and the movie name..',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

  processForm(){
    if(this.songName.length==0 || this.movieName.length == 0){
      this.dataMissingAlert();
    }else{
      this.dataService.saveSongRequest(this.songName, this.movieName,"S").subscribe((res) =>{
      this.presentAlert();
    });
    }

  }

}
