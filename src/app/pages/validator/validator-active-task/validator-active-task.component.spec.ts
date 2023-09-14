import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorActiveTaskComponent } from './validator-active-task.component';

describe('ValidatorActiveTaskComponent', () => {
  let component: ValidatorActiveTaskComponent;
  let fixture: ComponentFixture<ValidatorActiveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorActiveTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorActiveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
