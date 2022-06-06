import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {



  constructor(private userService: UserService,
    private client:HttpClient) { }
    PATH_OF_API = 'http://localhost:8080';
  public valueType = "Please Ener Location";
  public selected = "LOCATION";
  public value = "";

  ngOnInit(): void {
  }

  result:any;
  public generateReport(){
    this.userService.downloadReport(this.selected, this.value).subscribe((res:any) => {
      const disposition = res.headers.get('content-disposition');
      this.result = disposition.split(';')[1].trim().split('=')[1];
      // saveAs(res.body);
      var body = res.body;
      saveAs(body, this.result);
      return this.result.replace(/"/g, '');
    });
  }

  onOptionsSelected(value:string){
    console.log("the selected value is " + value);
    if(value == "LOCATION"){
      this.valueType = "Please Ener Location";
    }else if(value == "EMPLOYER"){
      this.valueType = "Please Enter Employer Id";
    }else if(value == "CATEGORY"){
      this.valueType = "Please Enter Category";
    }else if(value == "TECHNOLOGY"){
      this.valueType = "Please Enter Technology";
    }
}


changeValue(value:string){
  this.value = value;
}

}

