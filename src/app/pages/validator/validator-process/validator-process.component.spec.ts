import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorProcessComponent } from './validator-process.component';

describe('ValidatorProcessComponent', () => {
  let component: ValidatorProcessComponent;
  let fixture: ComponentFixture<ValidatorProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
