import { Component, Inject, ViewChild, ElementRef,AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer'

@Component({
  selector: 'app-dialog-modeling',
  templateUrl: './dialog-modeling.component.html',
  styleUrls: ['./dialog-modeling.component.css']
})
export class DialogModelingComponent implements AfterViewInit ,OnDestroy {

  @ViewChild('canvas') private canvasRef: ElementRef;

  private bpmnViewer: BpmnViewer;
  
  constructor(
    public dialogRef: MatDialogRef<DialogModelingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String
  ) {}

  ngOnInit(): void {}

async ngAfterViewInit(): Promise<void> {
    this.bpmnViewer = new BpmnViewer({
      container: this.canvasRef.nativeElement
    });

    try {
      await this.bpmnViewer.importXML(this.data);
      const canvas = this.bpmnViewer.get('canvas');
      canvas.zoom('fit-viewport', 'auto');
    } catch (err) {
      console.log('Error rendering BPMN diagram', err);
    }
}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.bpmnViewer) {
      this.bpmnViewer.destroy();
    }
  }

}