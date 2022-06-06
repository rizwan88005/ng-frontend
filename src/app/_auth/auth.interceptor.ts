import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import * as alertify from 'alertifyjs';
// const alertify = require('alertifyjs')


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private userAuthService: UserAuthService,
        private router:Router
        ){
            
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get("No-Auth") == 'True'){
            return next.handle(req.clone()).pipe(
                catchError((error : HttpErrorResponse) =>{
                    console.log(error);
                    alertify.error(error.error.message);
                    return throwError(error.error);
                })
            );

        }
        const token: any = this.userAuthService.getToken();
        req = this.addToken(req, token);
        
        return next.handle(req).pipe(catchError((err: any) => {
            console.log(err)
        if (err instanceof HttpErrorResponse) {
            
            if (err.status === 401 ||  err.status === 403) {
                if(err.status === 401){
                    alertify.error('Token Expired');
                }
                else if(err.status == 403){
                    alertify.error('Unauthorized');
                }
                this.router.navigate(['/signin']);
            }else{
                alertify.error(err.error.message);
            }
        } else{
            alertify.error(err.error.message);
        }
      return throwError("Something went wrong");
    }));
    }
    

    private addToken(req: HttpRequest<any>, token:string){
        return req.clone(
            {
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
    }
    
    
}