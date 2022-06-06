import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:8080';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private client:HttpClient,
    ) { }


  public login(loginData:any) {
      return this.client.post(this.PATH_OF_API + '/user/signin'
      , loginData
      , {headers: this.requestHeader,});
  }

  public logout(){
    try {
      this.client.get(this.PATH_OF_API + '/user/signout');
      return true;
    } catch (error) {
      console.log("Error ",error);
      return false;
    }
  }


  public downloadReport(reportType:string, value:string){
    return this.client.get(this.PATH_OF_API + `/job/generate/${reportType}/${value}`, { observe : 'response', responseType: 'blob' as 'json' });
  }


  public getListOfEmployers(role:string){
    return this.client.get(this.PATH_OF_API+`/user/get-users/${role}`);
  }


  deactivateUser(userId:String){
    return this.client.get(this.PATH_OF_API+`/user/block?userId=`+userId);
  }

  activateUser(userId:String){
    return this.client.get(this.PATH_OF_API+`/user/unblock?userId=`+userId);
  }

}
