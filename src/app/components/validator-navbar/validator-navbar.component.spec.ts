import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorNavbarComponent } from './validator-navbar.component';

describe('ValidatorNavbarComponent', () => {
  let component: ValidatorNavbarComponent;
  let fixture: ComponentFixture<ValidatorNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
