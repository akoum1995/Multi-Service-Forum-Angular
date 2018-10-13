import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'services/auth0.service';
import { AuthentificationService } from 'services/authentification.service';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
    test : Date = new Date();
    constructor(private auth0:Auth0Service,private as:AuthentificationService)
    {
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
    }
    register(f){
        if (f.valid) {
            this.as.addUser(f.value.email,f.value.username,f.value.password);
        }
    }
}
