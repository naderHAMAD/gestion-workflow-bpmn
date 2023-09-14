import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SimpleUserLayoutComponent } from './layouts/simple-user-layout/simple-user-layout.component';
import { ValidatorLayoutComponent } from './layouts/validator-layout/validator-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminGuard } from './guards/admin.guard';
import { ValidatorGuard } from './guards/validator.guard';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormEditorComponent } from './pages/form-editor/form-editor.component';
import { ProcessComponent } from './pages/process/process.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';
import { TaskComponent } from './pages/task/task.component';
import { ModelerComponent } from './pages/modeler/modeler.component';
import { FormComponent } from './pages/form/form.component';
import { TaskActiveComponent } from './pages/task-active/task-active.component';
import { SimpleUserActiveTaskComponent } from './pages/simple-user/simple-user-active-task/simple-user-active-task.component';
import { ValidatorActiveTaskComponent } from './pages/validator/validator-active-task/validator-active-task.component';
import { ValidatorProcessComponent } from './pages/validator/validator-process/validator-process.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ModComponent } from './pages/modeler-2/mod.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  { path: 'mod', component: ModComponent },

  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'register',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'form-editor', component: FormEditorComponent },
      { path: 'process', component: ProcessComponent },
      { path: 'workflow', component: WorkflowComponent },
      { path: 'task', component: TaskComponent },
      { path: 'modeler', component: ModelerComponent },
      { path: 'form', component: FormComponent },
      { path: 'task-active', component: TaskActiveComponent },
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: SimpleUserLayoutComponent,
    children: [
      { path: 'simple-user-active-task', component: SimpleUserActiveTaskComponent },
      {
        path: '',
        loadChildren: () => import('./layouts/simple-user-layout/simple-user-layout.module').then(m => m.SimpleUserLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: ValidatorLayoutComponent,
    children: [
      { path: 'validator-active-task', component: ValidatorActiveTaskComponent },
      { path: 'validator-process', component: ValidatorProcessComponent },
      {
        path: '',
        loadChildren: () => import('./layouts/validator-layout/validator-layout.module').then(m => m.ValidatorLayoutModule)
      }
    ]
  },
  {
    path: '**', // Wildcard route for handling undefined routes
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}