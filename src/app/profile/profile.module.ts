import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthentificationService } from 'services/authentification.service';
import {  HttpModule } from '@angular/http';
import { DataService } from 'services/data.service';
import { listPipe } from 'services/list.pipe';
import { list2Pipe } from 'services/list2.pipe';
import { AuthGuard1 } from 'services/authGard1.service';
import { ProfileRoutes } from 'app/profile/profile.routing';
import { ProfileComponent } from 'app/profile/profile.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProfileRoutes),
        FormsModule,
        HttpModule
        
    ],
    declarations: [ProfileComponent],
    providers:[
        AuthentificationService,
        DataService,
        AuthGuard1
    ]
    
})

export class ProfileModule {}
