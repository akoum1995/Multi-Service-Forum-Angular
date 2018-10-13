import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'services/authentification.service';
import { Router } from '@angular/router';
import { Auth0Service } from 'services/auth0.service';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test : Date = new Date();
    constructor(
        private authService:AuthentificationService,
        private router:Router,
        private auth0:Auth0Service
    ){
        this.authService=authService;
        this.auth0=auth0;
    }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    login(f){
        console.log(f);
        this.authService.login(f.value.username,f.value.password).subscribe(
            value=>{
                if(value.error){
                    this.showNotification(value.error);
                }else
                {
                    this.router.navigate(['/'])
                }
            });
        
    }
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
              align: 'right'
          }
      });
}
}
