import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { AuthentificationService } from 'services/authentification.service';
import {  HttpModule } from '@angular/http';
import { DataService } from 'services/data.service';
import { AuthGuard1 } from 'services/authGard1.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule
    ],
    declarations: [UserComponent],
    providers:[
        AuthentificationService,
        DataService,
        AuthGuard1
    ]
})

export class UserModule {}
