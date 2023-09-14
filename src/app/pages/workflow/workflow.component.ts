import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workflow } from 'src/app/entities/Workflow.entity';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogModelingComponent } from '../dialog/dialog-modeling/dialog-modeling.component';
import Swal from 'sweetalert2';
import { WorkflowService } from '../../services/workflow.service';
import { ProcessService } from '../../services/process.service';


@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit, OnDestroy {  

  workflowsLength: number = 0;
  workflows: Workflow[] = [];
  workflow!: Workflow;
  deploymentId!: string;
  dialogOpen: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private workflowService: WorkflowService,
    private processService :ProcessService
  ) { }
  
  ngOnInit(): void {
    this.getWorkflows();
  }

  getWorkflows(): void {
    this.workflowService.getWorkflows().subscribe(
      workflows => {
        this.workflows = workflows;
        this.workflowsLength = workflows.length;
      }
    );
  }

  onModelingClick(workflow: Workflow): void {
    this.workflow = workflow;
    this.router.navigate(['/modeler'], { state: { workflow: this.workflow, isUpdate: true } });
    console.log(this.workflow.xmlContent);
  }

  onStartProcessClick(workflow: Workflow): void {
    this.workflow = workflow;
    const deploymentId = this.workflow.deploymentId;

    this.processService.startProcess(deploymentId).subscribe(
      (processInstanceId: string) => {
        if (processInstanceId) {
          Swal.fire({
            title: ' Just Seconds !',
            html: `<h4>Process instance of <i> ${workflow.name} </i> Process is now running.</h4>`,
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              this.router.navigate(['/process'], { state: { processInstanceId, isSuspended: true } });
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })    
        } else {
          console.error('Process instance ID is null');
        }
      }
    );
  }

  onModelingPreviewClick(workflow: Workflow): void {
    if (this.dialogOpen) {
      return;
    }
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(DialogModelingComponent, {
      data: workflow.xmlContent
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;
    });
  }

  onPropretiesClick(workflow: Workflow): void {
    this.workflow = workflow;
    this.router.navigate(['/task', { deploymentId: this.workflow.deploymentId }]).then();
    console.log(this.workflow.deploymentId);
  }

  ngOnDestroy(): void {
    if (this.dialog.openDialogs.length) {
      this.dialog.closeAll();
    }
  }
}