import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard1 } from 'services/authGard1.service';

export const UserRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'user',
        component: UserComponent,
        canActivate:[AuthGuard1]
    }]
}
];
