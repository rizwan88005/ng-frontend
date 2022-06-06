import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role:string){
    localStorage.setItem("ROLE", role);
  }

  public getRole(){
    return localStorage.getItem("ROLE");
  }

  public setToken(token:string){
    localStorage.setItem("TOKEN", token);
  }

  public getToken(){
    return localStorage.getItem("TOKEN");
  }
  public clear(){
    return localStorage.clear();
  }

  public isLoggedIn(){
    return (this.getRole() && this.getToken());
  }
  
  public matchrole(role: any){
   const rolePresent =  this.getRole();
   if(rolePresent != null && rolePresent){
    return (rolePresent === role);
   }
   return false;
  }
  
}
