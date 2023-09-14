import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorSidebarComponent } from './validator-sidebar.component';

describe('ValidatorSidebarComponent', () => {
  let component: ValidatorSidebarComponent;
  let fixture: ComponentFixture<ValidatorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
