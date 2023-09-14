import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Form } from 'src/app/entities/Form.entity';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  forms: Form[];
  form !:Form;


  constructor(
    private formService: FormService ,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.formService.getAllForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  onUpdateClick(form: Form): void {
    this.form = form;
      this.router.navigate(['/form-editor'], { state:{ form :this.form , isUpdate: true } });
      console.log(this.form.formContent);
  }
  
  deleteForm(id: string) {
    this.formService.deleteFormById(id).subscribe(
      () => {
        console.log(`Form with ID ${id} deleted successfully.`);
        this.forms = this.forms.filter(form => form.id !== id);
      },
      error => console.error(error)
    );
  }

}
