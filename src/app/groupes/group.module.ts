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
import { GroupRoutes } from 'app/groupes/group.routing';
import { AddGroupComponent } from 'app/groupes/addgroup.component';
import { ListGroupComponent } from 'app/groupes/listgroup.component';
import { CartComponent } from 'app/groupes/card.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GroupRoutes),
        FormsModule,
        HttpModule
        
    ],
    declarations: [AddGroupComponent,ListGroupComponent,CartComponent],
    providers:[
        AuthentificationService,
        DataService,
        AuthGuard1
    ]
    
})

export class GroupModule {}
