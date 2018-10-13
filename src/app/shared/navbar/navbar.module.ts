import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { AuthentificationService } from 'services/authentification.service';
import { Auth0Service } from 'services/auth0.service';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ],
    providers: [
      AuthentificationService,
      Auth0Service
    ]
})

export class NavbarModule {}
