import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService:UserAuthService,
    private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      if(this.userAuthService.getToken() != null){
        const role = route.data["role"] as string;
        if(this.userAuthService.matchrole(role)){
          return true;
        }else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }

      if(this.userAuthService.isLoggedIn() && 'ADMIN' === this.userAuthService.getRole()){
        this.router.navigate(['/reports']);
      }
      this.router.navigate(['/signin']);
      return false;
  }
  
}
