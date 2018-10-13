import { Routes } from '@angular/router';

import { AuthGuard1 } from 'services/authGard1.service';
import { ProfileComponent } from 'app/profile/profile.component';

export const ProfileRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: ProfileComponent,
        canActivate:[AuthGuard1]
    }]
}
];
