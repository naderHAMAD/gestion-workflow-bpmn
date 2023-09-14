import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActiveTaskComponent } from './dialog-active-task.component';

describe('DialogActiveTaskComponent', () => {
  let component: DialogActiveTaskComponent;
  let fixture: ComponentFixture<DialogActiveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActiveTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogActiveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
