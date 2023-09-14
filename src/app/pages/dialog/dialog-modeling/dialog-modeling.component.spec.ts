import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModelingComponent } from './dialog-modeling.component';

describe('DialogModelingComponent', () => {
  let component: DialogModelingComponent;
  let fixture: ComponentFixture<DialogModelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModelingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
