import { Component, Inject, OnInit } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-dialog-active-task',
  templateUrl: './dialog-active-task.component.html',
  styleUrls: ['./dialog-active-task.component.css']
})
export class DialogActiveTaskComponent implements OnInit {
  formContent: any;
  selectedInputValue: number;

  constructor(
    private formService: FormService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DialogActiveTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.formService.getFormContent(this.data.formKey).subscribe((data: any) => {
      this.formContent = data;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCompleteClick(): void {
    const taskId = this.data.taskId;
  
    const formData = {};
  
    for (let component of this.formContent.components) {
      if (component.type === 'textfield') {
        const input = document.getElementById(component.id) as HTMLInputElement;
        formData[component.key] = input.value;
      } else if (component.type === 'radio') {
        formData[component.key] = this.selectedInputValue;
      }
    }
  
    const json = JSON.stringify(formData);
  
  
    this.formService.saveFormData(this.data.formKey, json).subscribe(
      (response) => {
        console.log('Form data saved successfully');
        const requestBody = { input: this.selectedInputValue };
        this.taskService.completeTask(taskId, requestBody.input).subscribe(
          () => {
            console.log('Task completed successfully');
            this.dialogRef.close({ completed: true, taskId: taskId });
          },
          (error) => {
            console.error('Failed to complete task', error);
            // show error message
          }
        );
      },
      (error) => {
        console.error('Failed to save form data', error);
        // show error message
      }
    );
  }
}
