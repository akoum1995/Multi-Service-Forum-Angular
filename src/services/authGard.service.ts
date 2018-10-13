import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthentificationService } from "services/authentification.service";
declare var $:any;
@Injectable()
export class AuthGuard implements CanActivate
{
    canActivate(route?, state?): boolean{
       
         if (this.auth.isLoggedIn())
         {
            this.router.navigate(['/home']);
            this.showNotification("You are already logged in!");
             return false;
         }
         return true;
       
    }
    
    constructor(
        private auth: AuthentificationService,
        private router:Router
    ){}
    showNotification(html){
        console.log(html);
      $.notify({
          icon: "notifications",
          message: html
  
      },{
          type:'rose',
          timer: 3000,
          placement: {
              from: 'top',
              align: 'left'
          }
      });
  
  }
    
}