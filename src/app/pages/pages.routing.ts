import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'services/authGard.service';

export const PagesRoutes: Routes = [

    {
        path: '',
        children: [ {
            path: 'login',
            component: LoginComponent,
            canActivate:[AuthGuard]
        },{
            path: 'lock',
            component: LockComponent
        },{
            path: 'register',
            component: RegisterComponent,
            canActivate:[AuthGuard]
        },{
            path: 'pricing',
            component: PricingComponent
        }]
    }
];
