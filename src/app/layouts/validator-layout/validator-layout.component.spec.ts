import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorLayoutComponent } from './validator-layout.component';

describe('ValidatorLayoutComponent', () => {
  let component: ValidatorLayoutComponent;
  let fixture: ComponentFixture<ValidatorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
