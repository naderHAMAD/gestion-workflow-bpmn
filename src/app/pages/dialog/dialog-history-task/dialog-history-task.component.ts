import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoricActivityInstance } from '../../../entities/HistoricActivityInstance.entity';
import { ProcessService } from '../../../services/process.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-history-task',
  templateUrl: './dialog-history-task.component.html',
  styleUrls: ['./dialog-history-task.component.css']
})
export class DialogHistoryTaskComponent implements OnInit {
  historicActivityInstances: HistoricActivityInstance[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogHistoryTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private processService: ProcessService
  ) { }

  ngOnInit(): void {
    this.fetchHistoricActivityInstances();
  }

  fetchHistoricActivityInstances(): void {
    this.subscriptions.push(
      this.processService.getExecutionHistory(this.data).subscribe(
        executionHistory => {
          this.historicActivityInstances = executionHistory;
        },
        error => {
          console.error(error);
        }
      )
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}