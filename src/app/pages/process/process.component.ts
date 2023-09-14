import { Component ,AfterViewInit,OnDestroy } from '@angular/core';
import { WorkflowProcessInstance } from 'src/app/entities/WorflowProcessInstance.entity';
import { Observable } from 'rxjs';
import { HistoricActivityInstance } from 'src/app/entities/HistoricActivityInstance.entity';
import { ProcessService } from 'src/app/services/process.service';
import { Subscription} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogHistoryTaskComponent } from '../dialog/dialog-history-task/dialog-history-task.component';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements AfterViewInit ,OnDestroy {


  workflowsProcessInstancesLength :number = 0; 
  workflowsProcessInstances : WorkflowProcessInstance[]=[];
  workflowProcessInstance!:WorkflowProcessInstance;

  private subscriptions: Subscription[] = [];


  constructor(
    private processService: ProcessService,
    private dialog: MatDialog,

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

  deleteWorkflowProcessInstance(Id: string) {
    this.subscriptions.push(
      this.processService.deleteProcessInstance(Id).subscribe(() => {
        // Remove the deleted process instance from the local array
        this.workflowsProcessInstances = this.workflowsProcessInstances.filter(instance => instance.id !== Id);
        // Update the length of the local array
        this.workflowsProcessInstancesLength = this.workflowsProcessInstances.length;
      })
    );
  }

  suspendWorkflowProcessInstance(Id: string) {
    this.subscriptions.push(
      this.processService.suspendProcessInstance(Id).subscribe(() => {
        const processInstance = this.workflowsProcessInstances.find(p => p.processInstanceId === Id);
        processInstance.status = "SUSPENDED";
        })
    );
  }

  restartWorkflowProcessInstance(Id: string) {
    this.subscriptions.push(
      this.processService.restartProcessInstance(Id).subscribe(() => {
        const processInstance = this.workflowsProcessInstances.find(p => p.processInstanceId === Id);
        if (processInstance) {
          processInstance.status = "ACTIVE";
        }
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The process restarted successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    );
  }

  resumeWorkflowProcessInstance(Id: string) {
    this.subscriptions.push(
      this.processService.restartProcessInstance(Id).subscribe(() => {
        const processInstance = this.workflowsProcessInstances.find(p => p.processInstanceId === Id);
        processInstance.status = "ACTIVE";
      })
    );
  }

  openHistoryDialog(processInstanceId: string): void {
    const dialogRef = this.dialog.open(DialogHistoryTaskComponent, {
      data: processInstanceId
    });
    console.log(processInstanceId);
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
    });
  }


  ngOnDestroy(): void {
    // Unsubscribe all subscriptions to avoid memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}