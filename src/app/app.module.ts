import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ModelerComponent } from './pages/modeler/modeler.component';
import { FormEditorComponent } from './pages/form-editor/form-editor.component';
import { DialogWorkflowComponent } from './pages/dialog/dialog-workflow/dialog-workflow.component';




import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProcessComponent } from './pages/process/process.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';
import { DialogModelingComponent } from './pages/dialog/dialog-modeling/dialog-modeling.component';
import { TaskComponent } from './pages/task/task.component';
import { DialogUserTaskComponent } from './pages/dialog/dialog-user-task/dialog-user-task.component';
import { FormComponent } from './pages/form/form.component';
import { DialogFormComponent } from './pages/dialog/dialog-form/dialog-form.component';
import { TaskActiveComponent } from './pages/task-active/task-active.component';
import { DialogActiveTaskComponent } from './pages/dialog/dialog-active-task/dialog-active-task.component';
import { SimpleUserActiveTaskComponent } from './pages/simple-user/simple-user-active-task/simple-user-active-task.component';
import { ValidatorActiveTaskComponent } from './pages/validator/validator-active-task/validator-active-task.component';
import { ValidatorProcessComponent } from './pages/validator/validator-process/validator-process.component';
import { ValidatorLayoutComponent } from './layouts/validator-layout/validator-layout.component';
import { SimpleUserLayoutComponent } from './layouts/simple-user-layout/simple-user-layout.component';
import { DialogHistoryTaskComponent } from './pages/dialog/dialog-history-task/dialog-history-task.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

import { ModComponent } from './pages/modeler-2/mod.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [
    AppComponent,
    ModComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ModelerComponent,
    FormEditorComponent,
    DialogWorkflowComponent,
    ProcessComponent,
    WorkflowComponent,
    DialogModelingComponent,
    TaskComponent,
    DialogUserTaskComponent,
    FormComponent,
    DialogFormComponent,
    TaskActiveComponent,
    DialogActiveTaskComponent,
    SimpleUserActiveTaskComponent,
    ValidatorActiveTaskComponent,
    ValidatorProcessComponent,
    ValidatorLayoutComponent,
    SimpleUserLayoutComponent,
    DialogHistoryTaskComponent,
    UnauthorizedComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
