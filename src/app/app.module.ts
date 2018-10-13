import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { environment } from 'environments/environment';
import { listPipe } from 'services/list.pipe';
@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule 
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],
    providers: [DatePipe] ,
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
