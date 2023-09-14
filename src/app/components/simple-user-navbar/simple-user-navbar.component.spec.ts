import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUserNavbarComponent } from './simple-user-navbar.component';

describe('SimpleUserNavbarComponent', () => {
  let component: SimpleUserNavbarComponent;
  let fixture: ComponentFixture<SimpleUserNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleUserNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleUserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
