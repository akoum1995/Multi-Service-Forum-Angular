import { Routes } from '@angular/router';

import { AuthGuard1 } from 'services/authGard1.service';
import { AddGroupComponent } from 'app/groupes/addgroup.component';
import { ListGroupComponent } from 'app/groupes/listgroup.component';

export const GroupRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'add',
        component: AddGroupComponent,
        canActivate:[AuthGuard1]
    },
    {
        path: 'list',
        component: ListGroupComponent,
        canActivate:[AuthGuard1]
    }]
}
];
