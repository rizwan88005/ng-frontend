import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getListOfEmployers('USER').subscribe((res :any) => {
      this.users = res.result;
    });
  }  

  activateDeactivate(empid:string, active:string){
    console.log(empid+"  "+active);

    if(active === "Activate"){
      this.userService.activateUser(empid).subscribe();
    }else if(active === "Deactivate"){
      this.userService.deactivateUser(empid).subscribe();
    }
    window.location.reload();
  }



}
