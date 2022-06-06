import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployersComponent } from './employers/employers.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { OtherComponent } from './other/other.component';
import { ReportsComponent } from './reports/reports.component';
import { SigninComponent } from './signin/signin.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  {path :'', component:HomeComponent },
  {path :'signin', component:SigninComponent},
  {path :'reports', component:ReportsComponent, canActivate:[AuthGuard], data:{role:"ADMIN"}},
  {path :'employers', component:EmployersComponent, canActivate:[AuthGuard], data:{role:"ADMIN"}},
  {path :'users', component:UsersComponent, canActivate:[AuthGuard], data:{role:"ADMIN"}},
  {path :'other', component:OtherComponent},
  {path :'forbidden', component:ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
