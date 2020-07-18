import { Component, OnInit } from '@angular/core';
import { RouterEvent, Router } from '@angular/router';
import { FetchDataService } from '../../fetch-data.service';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

//import { SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'My Profile',
      url: '../profile',
      icon: 'md-person'
    },
    {
      title: 'Recent Rank Changes',
      url: '../zacksrankchanges',
      icon: 'information-circle'
    }

  ];

  selectedPath = '';



  constructor(private router: Router,private dataService: FetchDataService,
    private network:Network,private platform:Platform
  //  , private socialSharing:SocialSharing
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
   }
   isConnected(){
     let conntype = this.network.type;
     return conntype && conntype !== 'unknown' && conntype !== 'none';
   }

  ngOnInit() {
      var offlinepages = [
        {
          title: 'Rate us',
          url: 'market://details?id=com.app.zacksbuyalerts',
          icon: 'thumbs-up'
        },
        {
          title: 'Share us',
          url: 'https://play.google.com/store/apps/details?id=com.app.zacksbuyalerts&hl=en_US',
          icon: 'logo-twitter'
        }

        /*,
        {
          title: 'Follow us',
          url: 'instagram://user?username=guitarchords4songs',
          icon: 'logo-instagram'
        }*/

      ];
      for(var i=0 ; i<offlinepages.length;i++){
            this.pages.push(offlinepages[i]);
      }
      this.pages.push({
        title: 'Disclaimer',
        url: '../disclaimer',
        icon: 'ios-warning'
      });
  }
  navigateToPage(url,titlename){
    if(titlename == "Rate us"){
      if(this.isConnected()){
        window.open(url, '_system');
      }
    }else if(titlename == "Share us"){
      if(this.isConnected()){
        this.sendShare("Hey buddy, i came across this app called 'Zacks rank alerts' and i just love it ! It is a wonderful pocket guide for zacks ranks on stocks. Check them out now.","Zacks rank alerts",url);
     }
   }else if(titlename == "Follow us"){
      if(this.isConnected()){
        window.open(url, '_system');
     }
    }else{
      this.router.navigate([url]);
    }

  }

  sendShare(message, subject, url) {
    var onSuccess = function(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  };

  var onError = function(msg) {
    console.log("Sharing failed with message: " + msg);
  };

    var options = {
    message: message, // not supported on some apps (Facebook, Instagram)
    subject: 'the subject', // fi. for email
    url: url,
    chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
  };
  if(this.platform.is("cordova")){
    console.log((window as any).plugins);
    (window as any).plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
  }
/*    this.socialSharing.shareViaWhatsApp("test", "tes", "tes").then((res) => {
      console.log("In");
}).catch((e) => {
console.log(e);
});
*/

  }  // End of fu




}
