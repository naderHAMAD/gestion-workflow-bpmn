import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserTaskComponent } from './dialog-user-task.component';

describe('DialogUserTaskComponent', () => {
  let component: DialogUserTaskComponent;
  let fixture: ComponentFixture<DialogUserTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
