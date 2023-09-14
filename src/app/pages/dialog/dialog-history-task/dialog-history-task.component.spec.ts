import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoryTaskComponent } from './dialog-history-task.component';

describe('DialogHistoryTaskComponent', () => {
  let component: DialogHistoryTaskComponent;
  let fixture: ComponentFixture<DialogHistoryTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHistoryTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHistoryTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
