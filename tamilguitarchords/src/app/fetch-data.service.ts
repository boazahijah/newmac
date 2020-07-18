import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  private finaldata = [];
  private getBaseURL = "http://139.59.12.180:5000"
  //private getBaseURL = "http://d7c67b2f710b.ngrok.io";


  constructor(private http: HttpClient) { }
  getLanguages() {
     return this.http.get(this.getBaseURL+"/admin/languages");
  }
  getSocialEvents() {
     return this.http.get(this.getBaseURL+"/admin/socialevents");
  }

  getSongsList(languageName, pageNo) {
     return this.http.get(this.getBaseURL+"/admin/fetchSongsV2?languageName="+languageName+"&pageNo="+pageNo);
  }
  getFilteredSongsList(languageName, pageNo,searchInput) {
     return this.http.get(this.getBaseURL+"/admin/fetchSongsV2?languageName="+languageName+"&pageNo="+pageNo+"&searchInput="+searchInput);
  }

  getTotalSongsCount(languageName) {
     return this.http.post(this.getBaseURL+"/admin/getTotalRecordCount",{'languagename' : languageName});
  }

  getSongDetails(songName) {
     return this.http.get(this.getBaseURL+"/admin/songDetailsV2?songName="+songName);
  }

  getChordDetails(songName) {
     return this.http.get(this.getBaseURL+"/admin/chordDetailsV2?songName="+songName);
  }

  saveSongRequest(songName, movieName,status) {
     return this.http.post(this.getBaseURL+"/admin/submitSongRequest",{'songname':songName, 'moviename':movieName,'status':status});
   }

   saveDeviceDetails(deviceid, devicetoken, apptype) {
      return this.http.post(this.getBaseURL+"/admin/register",{'device_token':devicetoken, 'device_id':deviceid, 'apptype':apptype});
    }

    updateUserDetails(username,emailid,gender,devicetoken, apptype) {
       return this.http.post(this.getBaseURL+"/admin/updateUserDetails",{'username':username,
       'emailid':emailid,
       'gender':gender,
       'device_token':devicetoken,
       'apptype':apptype});
     }

     getUserDetails(username) {
        return this.http.get(this.getBaseURL+"/admin/getUserDetails?username="+username);
     }
     getUserDetailsByDeviceId(deviceid) {
        return this.http.get(this.getBaseURL+"/admin/getUserDetailsByDeviceId?deviceid="+deviceid);
     }

     getLastFiveEntries(language) {
        return this.http.get(this.getBaseURL+"/admin/getLastFiveEntries?language="+language);
     }

     saveComment(type,data,username,songname,imageData) {
        return this.http.post(this.getBaseURL+"/admin/saveComment",
        {'type':type, 'data':data,'imageData' : imageData, 'username':username,'songname':songname});
      }

      getComments(songname) {
         return this.http.get(this.getBaseURL+"/admin/comments?songname="+songname);
      }
      getCommentsCount(songname) {
         return this.http.get(this.getBaseURL+"/admin/getCommentsCount?songname="+songname);
      }
      getSongsCount(language) {
         return this.http.get(this.getBaseURL+"/admin/getSongsCount?language="+language);
      }

      getCommentsBySongNameV2(songname, pageNo) {
         return this.http.get(this.getBaseURL+"/admin/getCommentsBySongnameV2?songname="+songname+"&pageNo="+pageNo);
      }
      removeComment(commentid) {
         return this.http.post(this.getBaseURL+"/admin/removeComment",
         {'commentid':commentid});
       }
       incrementHits(songname,langname) {
          return this.http.post(this.getBaseURL+"/admin/incrementHits",
          {'songname':songname, 'langname':langname});
        }
        getFirstFiveHits(langname) {
           return this.http.get(this.getBaseURL+"/admin/getFirstFiveHits?langname="+langname);
         }

         getAppProperty(appname,propertyname) {
            return this.http.get(this.getBaseURL+"/admin/getAppVersion?appname="+appname+"&property="+propertyname);
          }





}
