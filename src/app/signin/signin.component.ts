import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private userService:UserService,
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signin(loginForm:NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response:any) => {
        this.userAuthService.setRole(response.result.roleType);
        this.userAuthService.setToken(response.result.accessToken);
        const role = this.userAuthService.getRole();
        console.log(role);
        if(role === "ADMIN"){
          this.router.navigate(['/reports']);
        }else{
          this.router.navigate(['/other']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



  public roleMatch(allowedRole: string): boolean {
    let isMatch: boolean = false;
    const role: any = this.userAuthService.getRole();
    if (role != null && role) {
      if(role === role){
        return true;
      }
      return false;
    }  
    return false;
  }

}
