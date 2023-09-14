import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormEditor, createFormEditor } from "@bpmn-io/form-js";
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';

import { DialogFormComponent } from '../dialog/dialog-form/dialog-form.component';
import { Form } from 'src/app/entities/Form.entity';
import { FormService } from 'src/app/services/form.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css']
})
export class FormEditorComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;


  private formEditor: FormEditor;
  private form: Form;
  isUpdate: boolean;
  dialogOpen: boolean = false;


  schema: {} = {}

  constructor(
    private formService: FormService,
    public dialog: MatDialog,
    ) { }

    ngOnInit() {
      this.form = history.state.form;
      this.isUpdate = history.state.isUpdate ?? false;
    
      // check if a form object was received
      if (this.form) {
        this.schema = JSON.parse(this.form.formContent);
      } else {
        // if no form object received, display default form
        this.schema = {
          "components": [
            {
              "key": "information",
              "label": "Information",
              "type": "textfield",
              "validate": {
                "required": true
              }
            },
            {
              "key": "supp_information",
              "label": "Supp Information",
              "type": "textfield",
              "validate": {
                "required": true
              }
            },
          
            {
              "key": "submit",
              "label": "Submit",
              "type": "button"
            },
          ],
          "type": "default"
        };
      }
    
      createFormEditor({
        container: this.canvasRef.nativeElement,
        schema: this.schema,
        exporter: {
          name: "flowvioo form editor",
          version: "1.0.0"
        }
      }).then(editor => this.formEditor = editor);
    }

  downloadFormJson() {
    const json = JSON.stringify(this.formEditor.getSchema(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'form-schema.json');
  }

  importFormJson(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result as string;
        try {
          const schema = JSON.parse(content);
          this.schema = schema;
          this.formEditor.importSchema(schema);
        } catch (err) {
          console.error('Error parsing JSON schema', err);
        }
      };
      reader.readAsText(file);
    }
  }

 saveForm() {

  if (this.dialogOpen) {
    return; // do nothing if dialog is already open
  }
  this.dialogOpen = true;

    const dialogRef = this.dialog.open(DialogFormComponent, {
      data: { formType: '' }
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.dialogOpen = false; // set flag to false when dialog is closed

      if (result) {
        const schema = JSON.stringify(this.formEditor.getSchema());

        const form: Form = {
          id: '',
          formContent: schema,
          formKey:this.formEditor.getSchema().id,
          formType: result.formType,
        };
      
        this.formService.saveFormJson(form).toPromise().then(savedForm => {
          console.log('Form saved:', savedForm);
          this.form = savedForm;
          // show success alert
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The form was saved successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        }).catch(err => {
          console.error('Error saving form', err);
        });
      }
    })
  }

  updateAndSaveForm() {

    if (this.dialogOpen) {
      return; // do nothing if dialog is already open
    }
    this.dialogOpen = true;

    const dialogRef = this.dialog.open(DialogFormComponent, {
      data: { formType: '' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      
      this.dialogOpen = false; // set flag to false when dialog is closed

      if (result) {
        const schema = JSON.stringify(this.formEditor.getSchema());
  
        const updatedForm: Form = {
          id: this.form.id,
          formContent: schema,
          formKey: this.formEditor.getSchema().id,
          formType: result.formType,
        };
  
        this.formService.updateFormJson(updatedForm).toPromise().then(updatedForm => {
          console.log('Form updated:', updatedForm);
          this.form = updatedForm;
          // show success alert
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The Form was updated successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        }).catch(err => {
          console.error('Error updating form', err);
        });
      }
    });
    }


  ngOnDestroy() {
    this.formEditor.destroy();
    if (this.dialog.openDialogs.length) {
      this.dialog.closeAll();
    }
  }
  
}
