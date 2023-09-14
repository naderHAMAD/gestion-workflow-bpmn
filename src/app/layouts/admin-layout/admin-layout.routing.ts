import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TaskComponent } from '../../pages/task/task.component';
import { ModelerComponent } from '../../pages/modeler/modeler.component';
import { FormEditorComponent } from '../../pages/form-editor/form-editor.component';
import { ProcessComponent } from '../../pages/process/process.component';
import { WorkflowComponent } from '../../pages/workflow/workflow.component'
import { FormComponent } from '../../pages/form/form.component'
import { TaskActiveComponent } from '../../pages/task-active/task-active.component'
export const AdminLayoutRoutes: Routes = [
  { path: 'user-profile',   component: UserProfileComponent },
  { path: 'form-editor',    component: FormEditorComponent },
  { path: 'process',        component: ProcessComponent },
  { path: 'workflow',       component: WorkflowComponent },
  { path: 'task' ,          component: TaskComponent},
  { path: 'modeler',        component: ModelerComponent },
  { path: 'form',           component: FormComponent },
  { path: 'task-active',    component: TaskActiveComponent },
];
