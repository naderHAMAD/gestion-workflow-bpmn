import { Component, OnInit,OnDestroy } from '@angular/core';

import { SendTask } from 'src/app/entities/SendTask.entity';
import { ServiceTask } from 'src/app/entities/ServiceTask.entity';
import { UserTask } from 'src/app/entities/UserTask.entity';
import { Workflow } from 'src/app/entities/Workflow.entity';
import { GatewaySequenceFlow } from 'src/app/entities/GatewaySequenceFlow.entity';
import { TaskService } from 'src/app/services/task.service';

import { MatDialog } from '@angular/material/dialog';
import {DialogUserTaskComponent} from '../dialog/dialog-user-task/dialog-user-task.component'
import { ActivatedRoute} from '@angular/router'

import { Subscription} from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  sendTasks: SendTask[] = [];
  serviceTasks: ServiceTask[] = [];
  userTasks: UserTask[] = [];
  gatewaySequenceFlows: GatewaySequenceFlow[] = [];
  workflow!: Workflow;
  userTask!: UserTask;
  deploymentId!: string;

  isUserTasksVisible = false;
  isServiceTasksVisible = false;
  isSendTasksVisible = false;
  isGatewaySequenceFlowsVisible = false;
  dialogOpen: boolean = false;


  private subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Get the deployment ID from the navigation extras
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      params => {
        const newDeploymentId = params['deploymentId'];
        console.log(newDeploymentId);
        if (newDeploymentId !== this.deploymentId) {
          // Update the deployment ID only when necessary
          this.deploymentId = newDeploymentId;
          console.log(this.deploymentId);
          // Get the user tasks, service tasks, and send tasks for the given deployment ID
          this.getUserTasks();
          this.getServiceTasks();
          this.getSendTasks();
          this.getGatewaySequenceFlows();
        }
      }
    ));
  }


  toggleUserTasks(): void {
    this.isUserTasksVisible = !this.isUserTasksVisible;
  }

  toggleServiceTasks(): void {
    this.isServiceTasksVisible = !this.isServiceTasksVisible;
  }

  toggleSendTasks(): void {
    this.isSendTasksVisible = !this.isSendTasksVisible;
  }

  toggleGatewaySequenceFlows(): void {
    this.isGatewaySequenceFlowsVisible = !this.isGatewaySequenceFlowsVisible;
  }

  getUserTasks(): void {
    this.subscriptions.push(
      this.taskService.getUserTasks(this.deploymentId)
      .subscribe(
        userTasks => {
          this.userTasks = userTasks;
          console.log(userTasks);
        }
      )
    );
  }

  getServiceTasks(): void {
    this.subscriptions.push(
      this.taskService.getServiceTasks(this.deploymentId)
      .subscribe(
        serviceTasks => {
          this.serviceTasks = serviceTasks;
          console.log(serviceTasks);
        }
      )
    );
  }



  getSendTasks(): void {
    this.subscriptions.push(
      this.taskService.getSendTasks(this.deploymentId)
      .subscribe(
        sendTasks => {
          this.sendTasks = sendTasks;
          console.log(sendTasks);
        })
    );
  }

  getGatewaySequenceFlows(): void {
    this.subscriptions.push(
      this.taskService.getGatewaySequenceFlows(this.deploymentId)
      .subscribe(
        gatewaySequenceFlows => {
          this.gatewaySequenceFlows = gatewaySequenceFlows;
          console.log(gatewaySequenceFlows);
        })
    );
  }

  onUpdateClick(userTaskId: string): void {
    if (this.dialogOpen) {
      return; // do nothing if dialog is already open
    }
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(DialogUserTaskComponent, {
      data: {formKey:''}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogOpen = false; // set flag to false when dialog is closed
      if (result) {
        const assignee = result.assignee;
        //const candidateUsers = result.candidateUsers;
        const formKey = result.formKey;

        const updatedUserTaskIndex = this.userTasks.findIndex(task => task.id === userTaskId);
        if (updatedUserTaskIndex !== -1) {
          this.userTasks[updatedUserTaskIndex].assignee = assignee;
          //this.userTasks[updatedUserTaskIndex].candidateUsers = candidateUsers;
          this.userTasks[updatedUserTaskIndex].formKey = formKey;

          this.subscriptions.push(
            this.taskService.updateUserTask(this.deploymentId ,userTaskId,formKey,assignee)
            .subscribe(() => {
              console.log("User task updated successfully");
            },(error) => {
              console.log("Error updating user task: ", error);
            })        
          );
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions to avoid memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    if (this.dialog.openDialogs.length) {
      this.dialog.closeAll();
    }
  }
}