import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUserActiveTaskComponent } from './simple-user-active-task.component';

describe('SimpleUserActiveTaskComponent', () => {
  let component: SimpleUserActiveTaskComponent;
  let fixture: ComponentFixture<SimpleUserActiveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleUserActiveTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleUserActiveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
