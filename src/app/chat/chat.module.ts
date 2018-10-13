import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthentificationService } from 'services/authentification.service';
import {  HttpModule } from '@angular/http';
import { DataService } from 'services/data.service';
import { ChatRoutes } from 'app/chat/chat.routing';
import { ChatComponent } from 'app/chat/chat.component';
import { listPipe } from 'services/list.pipe';
import { list2Pipe } from 'services/list2.pipe';
import { AuthGuard1 } from 'services/authGard1.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ChatRoutes),
        FormsModule,
        HttpModule
        
    ],
    declarations: [list2Pipe,listPipe,ChatComponent],
    providers:[
        AuthentificationService,
        DataService,
        AuthGuard1
    ]
    
})

export class ChatModule {}
