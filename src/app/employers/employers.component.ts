import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_INITIALIZER } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements OnInit {

  employers:any

  constructor(private userService: UserService,private router:Router) { 
  }

  ngOnInit(): void {
    this.employers = this.userService.getListOfEmployers('EMPLOYER').subscribe((res :any) => {
      this.employers = res.result;
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
