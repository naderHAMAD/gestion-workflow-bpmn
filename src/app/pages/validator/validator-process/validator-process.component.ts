import { Component ,AfterViewInit,OnDestroy } from '@angular/core';
import { WorkflowProcessInstance } from 'src/app/entities/WorflowProcessInstance.entity';
import { WorkflowService } from 'src/app/services/workflow.service';
import { ProcessService } from 'src/app/services/process.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogModelingComponent} from '../../dialog/dialog-modeling/dialog-modeling.component';
import { Subscription} from 'rxjs';

import { Workflow } from 'src/app/entities/Workflow.entity';

@Component({
  selector: 'app-validator-process',
  templateUrl: './validator-process.component.html',
  styleUrls: ['./validator-process.component.css']
})
export class ValidatorProcessComponent implements AfterViewInit ,OnDestroy {

  workflowsProcessInstancesLength :number = 0; 
  workflowsProcessInstances : WorkflowProcessInstance[]=[];
  workflowProcessInstance!:WorkflowProcessInstance;
  dialogOpen: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private processService: ProcessService,
    private workflowService: WorkflowService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit(): void { 
    this.getWorkflowsProcessInsatnces();
  }

  getWorkflowsProcessInsatnces():void {
    this.subscriptions.push(
      this.processService.getProcessInstances().subscribe(
        workflowsProcessInstances => {
          this.workflowsProcessInstances = workflowsProcessInstances ;
          this.workflowsProcessInstancesLength = workflowsProcessInstances.length;
        })
    );
  }

  onModelingPreviewClick(workflow: Workflow): void {
    if (this.dialogOpen) {
      return; // do nothing if dialog is already open
    }
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(DialogModelingComponent, {
       data: workflow.xmlContent
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;});
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions to avoid memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
