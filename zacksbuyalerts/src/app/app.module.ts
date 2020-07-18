import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FetchDataService } from './fetch-data.service';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { HttpClientModule } from "@angular/common/http";
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { IonicStorageModule } from '@ionic/storage';
import { FavoritesService } from './favorites.service';
import { LoadingServiceService } from './loading-service.service';
import { GoogleAdDisplayService } from './google-ad-display.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NgCircleProgressModule } from 'ng-circle-progress';


export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'press': {time: 500},  // default: 251 ms
    'pinch': {enable: false},
    'rotate': {enable: false},
    'tap': {taps: 2},
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,IonicModule.forRoot(),SuperTabsModule.forRoot(), IonicStorageModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300    }),

AppRoutingModule, HttpClientModule, NgxIonicImageViewerModule],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    FetchDataService,
    FavoritesService,
    GoogleAdDisplayService,
    YoutubeVideoPlayer,
    Network,
    ImagePicker,
      //  SocialSharing,
    FCM,
    UniqueDeviceID,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
