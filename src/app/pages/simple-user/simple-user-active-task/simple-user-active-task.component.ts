import { Component, OnInit } from '@angular/core';
import { ActiveTask } from 'src/app/entities/ActiveTask.entity';

import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogActiveTaskComponent } from '../../dialog/dialog-active-task/dialog-active-task.component';


@Component({
  selector: 'app-simple-user-active-task',
  templateUrl: './simple-user-active-task.component.html',
  styleUrls: ['./simple-user-active-task.component.css']
})
export class SimpleUserActiveTaskComponent implements OnInit {
  tasks: ActiveTask[];
  dialogOpen: boolean = false;

  constructor(private taskService: TaskService ,private dialog: MatDialog) { }

  ngOnInit() {
    this.taskService.getSimpleUserActiveUserTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  openDialog(formKey: string, taskId: string): void {
    if (this.dialogOpen) {
      return; // do nothing if dialog is already open
    }
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(DialogActiveTaskComponent, {
      data: { formKey, taskId  }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false; // set flag to false when dialog is closed
      if (result && result.completed) {
        this.taskService.getSimpleUserActiveUserTasks().subscribe(tasks => {
          this.tasks = tasks;
        });
      }
    });
  }


}
