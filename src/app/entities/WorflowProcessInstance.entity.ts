import { Workflow } from 'src/app/entities/Workflow.entity';
export class WorkflowProcessInstance {
    id: string|undefined;
    processInstanceId: string|undefined;
    processName: string|undefined;
    workflow: Workflow|undefined;
    status: string|undefined;
  }