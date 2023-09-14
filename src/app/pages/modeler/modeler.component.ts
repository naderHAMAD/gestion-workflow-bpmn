import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogWorkflowComponent } from '../dialog/dialog-workflow/dialog-workflow.component';
import { Workflow } from 'src/app/entities/Workflow.entity';
import { WorkflowService } from 'src/app/services/workflow.service';
import { Subscription} from 'rxjs';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modeler',
  templateUrl: './modeler.component.html',
  styleUrls: ['./modeler.component.css']
})
export class ModelerComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  private bpmnModeler: BpmnModeler;
  private workflow: Workflow;
  isUpdate: boolean;
  dialogOpen: boolean = false;


  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private workflowService: WorkflowService,
  ) {}

  ngOnInit() {
    this.bpmnModeler = new BpmnModeler({
      container: this.canvasRef.nativeElement
    });

    this.workflow = history.state.workflow;
    this.isUpdate = history.state.isUpdate ?? false;

    if (this.workflow) {
      this.loadWorkflow();
    } else {
      this.createNewWorkflow();
    }
  }

  async loadWorkflow() {
    try {
      await this.bpmnModeler.importXML(this.workflow.xmlContent);
      this.zoomToFit();
    } catch (err) {
      console.error(err);
    }
  }

  

  createNewWorkflow() {
    this.bpmnModeler.createDiagram().then(() => {
      this.zoomToFit();
    }).catch((error) => {
      console.error('Error creating diagram', error);
    });
  }

  zoomToFit() {
    const canvas = this.bpmnModeler.get('canvas');
    canvas.zoom('fit-viewport', 'auto');
  }

  onSaveClick() {
    if (this.dialogOpen) {
      return; // do nothing if dialog is already open
    }
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(DialogWorkflowComponent, {
      data: { workflowName: '', xmlName: '' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogOpen = false; // set flag to false when dialog is closed
      if (result) {
        this.bpmnModeler.saveXML({ format: true }, (err: any, xml: string) => {
          if (err) {
            console.error(err);
          } else {
            // Modify the xml string to set the isExecutable attribute to true
            const uniqueId = Math.floor(Math.random() * 10000);
            const modifiedXml = xml.replace('id="Process_1" isExecutable="false"', `id="Process_${uniqueId}" isExecutable="true"`);
            const  modifiedXml2 = modifiedXml.replace('bpmnElement="Process_1" id="BPMNPlane_1"', `bpmnElement="Process_${uniqueId}" id="BPMNPlane_1"`);
            const workflow: Workflow = {
              name: result.workflowName,
              xmlContent: modifiedXml2,
              xmlName: result.xmlName + '.bpmn',
              deploymentId: '',
              id: ''
            };
            this.subscriptions.push(
              this.workflowService.saveWorkflow(workflow).subscribe(
                (workflow: Workflow) => {
                  console.log('Workflow saved:', workflow);
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'The BPMN was saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                },
                (error) => {
                  console.error('Error saving workflow:', error);
                  if (error.error && error.error.message) {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: error.error.message,
                      showConfirmButton: false,
                      timer: 1500
                    })
                  } else {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'An error occurred while saving the workflow.',
                      showConfirmButton: false,
                      timer: 2500
                    })
                  }
                }
              )
            );
          }
        });
      }
    });
  }

  onUpdateClick(): void {
    if (!this.workflow) {
      console.error('Workflow not found.');
      return;
    }
  
    this.bpmnModeler.saveXML({ format: true }, (err: any, xml: string) => {
      if (err) {
        console.error(err);
        return;
      }

      this.workflow.xmlContent = xml;
      this.subscriptions.push(
        this.workflowService.updateWorkflow(this.workflow)
        .subscribe(
          () => {
            console.log('Workflow saved:', this.workflow);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'The BPMN is updated successfully!',
              html: 'NOTE : now you can start the <i> latest </i> version of the process',
              showConfirmButton: false,
              timer: 2500
            })        
        },  
          (error) => {
            console.error('Error saving workflow:', error);
            if (error.error && error.error.message) {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: error.error.message,
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'An error occurred while saving the workflow.',
                showConfirmButton: false,
                timer: 2500
              })
            }
          }
        )
      );
    });
  }
  
  onDownloadClick(): void {
    this.bpmnModeler.saveXML({ format: true }, (err: any, xml: string) => {
      if (err) {
        console.error(err);
      } else {
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.download = 'process.bpmn';
        anchor.href = url;
        anchor.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  onImportClick(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.bpmn, .xml';
  
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const xml = reader.result as string;
        this.bpmnModeler.importXML(xml, (err: any) => {
          if (err) {
            console.error(err);
          } else {
            this.zoomToFit();
          }
        });
      };
  
      reader.readAsText(file);
    };
    input.click();
  }

  
  ngOnDestroy(): void {
    // Unsubscribe all subscriptions to avoid memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    if (this.bpmnModeler) {
      this.bpmnModeler.destroy();
    }
    if (this.dialog.openDialogs.length) {
      this.dialog.closeAll();
    }
  }
}
