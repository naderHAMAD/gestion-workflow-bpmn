import { Component, Inject ,OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from '../../../services/form.service';
import { Subscription } from 'rxjs';
import { Form } from '../../../entities/Form.entity';

@Component({
  selector: 'app-dialog-user-task',
  templateUrl: './dialog-user-task.component.html',
  styleUrls: ['./dialog-user-task.component.css']
})
export class DialogUserTaskComponent implements OnDestroy {

  forms: Form[];
  private formSubscription: Subscription;

  constructor(
    private formService: FormService,
    public dialogRef: MatDialogRef<DialogUserTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formSubscription = this.formService.getAllForms()
    .subscribe((forms: Form[]) => {
      this.forms = forms;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
