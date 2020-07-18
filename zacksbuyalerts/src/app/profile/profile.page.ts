import { Component, OnInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AlertController,NavController } from '@ionic/angular';
import { FetchDataService } from '../fetch-data.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
uniqueid:any;
username = "";
emailid = "";
gender = "";
  constructor(private uniqueDeviceID: UniqueDeviceID,public alertController: AlertController, private dataService: FetchDataService,
  private navCtrl : NavController,private favoritesService : FavoritesService) { }

  ngOnInit() {
    this.setDeviceId();
  }
  async  presentAlert(){
  const alert = await this.alertController.create({
  header: 'Awesome!',
  message: 'Your profile has been <strong>updated</strong>!!!',
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
        message: 'Please update all the required details..',
        buttons: ['OK']
      });
      await alert.present();
    }

    async userNameTakenAlert() {
      const alert = await this.alertController.create({
        header:"User Name already taken",
        animated:true,
        message: 'Please select a different username',
        buttons: ['OK']
      });
      await alert.present();
    }

  setDeviceId(){
    this.uniqueDeviceID.get()
    .then((uuid: any) =>{
      this.uniqueid = uuid;
      this.dataService.getUserDetailsByDeviceId(this.uniqueid).subscribe((res:any) =>{
        console.log(res);
        if(res.length != 0){
          this.username = res[0].username;
          this.emailid = res[0].emailid;
          this.gender = res[0].gender;
        }
      });

    });
  }

  updateProfile(){
    this.dataService.getUserDetails(this.username).subscribe((res:any) =>{
      if(res.length !=0 ){
        this.userNameTakenAlert();
      }else{
        if(this.username.length==0 || this.gender.length == 0){
          this.dataMissingAlert();
        }else{
          this.dataService.updateUserDetails(this.username, this.emailid,this.gender,this.uniqueid,"C").subscribe((res) =>{
            this.favoritesService.setUserName(this.username);
            this.presentAlert();
        });
      }
    }
    });

}
}
