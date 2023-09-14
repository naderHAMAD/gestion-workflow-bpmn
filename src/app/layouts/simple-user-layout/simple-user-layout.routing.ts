import { Routes } from '@angular/router';
import{SimpleUserProfileComponent} from '../../pages/simple-user/simple-user-profile/simple-user-profile.component'
import{SimpleUserActiveTaskComponent} from '../../pages/simple-user/simple-user-active-task/simple-user-active-task.component'


export const SimpleUserLayoutRoutes: Routes = [
    { path: 'simple-user-profile',          component: SimpleUserProfileComponent },
    { path: 'simple-user-active-task',      component: SimpleUserActiveTaskComponent },
];