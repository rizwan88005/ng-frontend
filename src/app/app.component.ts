import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './_services/user-auth.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'job-portal';

  constructor(private  userAuthService: UserAuthService,
    private userSevice:UserService,
    private router:Router){
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    if(this.userSevice.logout()){
      this.userAuthService.clear();
      this.router.navigate(['/']);
    }
  }

  public matchrole(role:string){
    return this.userAuthService.matchrole(role);
  }

}
