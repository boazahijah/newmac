import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  private finaldata = [];
  private getBaseURL = " http://139.59.12.180:3000";
  //private getBaseURL = "http://f511a291fb75.ngrok.io";


  constructor(private http: HttpClient) { }
  getLanguages() {
     return this.http.get(this.getBaseURL+"/admin/languages");
  }
  getSocialEvents() {
     return this.http.get(this.getBaseURL+"/admin/socialevents");
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

     
         getAppProperty(appname,propertyname) {
            return this.http.get(this.getBaseURL+"/admin/getAppVersion?appname="+appname+"&property="+propertyname);
          }

          getZacksRankList(rank, pageNo) {
             return this.http.get(this.getBaseURL+"/admin/getAllZacksListByRank?rank="+rank+"&pageNo="+pageNo);
          }

          getZacksRankByPriceList(startprice,endprice, pageNo) {
             return this.http.get(this.getBaseURL+"/admin/getZacksRankByPricePaginate?startprice="+startprice+"&endprice="+endprice+"&pageNo="+pageNo);
          }

          getIndustryNamesMaster() {
             return this.http.get(this.getBaseURL+"/admin/getIndustryNamesMaster");
          }
          applyFilter(query,pageNo,username,deviceid) {
            return this.http.post(this.getBaseURL+"/admin/applyFilter?pageNo="+pageNo+"&username="+username+"&deviceid="+deviceid,{'data' : query});
          }
          getCompanyFinancials(tickerName) {
            return this.http.get(this.getBaseURL+"/admin/getCompanyFinancials?tickerName="+tickerName);
          }

          addToWatchList(tickerName, userName, deviceId) {
            return this.http.post(this.getBaseURL+"/admin/saveNotification?tickerName="+tickerName,
          {'tickerName' : tickerName, 'username' : userName,'deviceid' : deviceId});
          }

          removeFromWatchList(tickerName, userName, deviceId) {
            return this.http.post(this.getBaseURL+"/admin/removeNotification?tickerName="+tickerName,
          {'tickerName' : tickerName, 'username' : userName,'deviceid' : deviceId});
          }

          getRecentZacksRankChanges(pageNo,username,deviceid){
            return this.http.get(this.getBaseURL+"/admin/getRecentZacksRankChanges?pageNo="+pageNo+"&username="+username+"&deviceid="+deviceid);
          }







}
