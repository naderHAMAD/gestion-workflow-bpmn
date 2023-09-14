import { Routes } from '@angular/router';
import{ValidatorProfileComponent} from '../../pages/validator/validator-profile/validator-profile.component'
import{ValidatorProcessComponent} from '../../pages/validator/validator-process/validator-process.component'
import{ValidatorActiveTaskComponent} from '../../pages/validator/validator-active-task/validator-active-task.component'


export const ValidatorLayoutRoutes: Routes = [
    { path: 'validator-profile',          component: ValidatorProfileComponent },
    { path: 'validator-process',           component: ValidatorProcessComponent },
    { path: 'validator-active-task',      component: ValidatorActiveTaskComponent },

];