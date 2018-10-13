import { Routes } from '@angular/router';

import { ChatComponent } from 'app/chat/chat.component';
import { AuthGuard1 } from 'services/authGard1.service';

export const ChatRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: ChatComponent,
        canActivate:[AuthGuard1]
    }]
}
];
