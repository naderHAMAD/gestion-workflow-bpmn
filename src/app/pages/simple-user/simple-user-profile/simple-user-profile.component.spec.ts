import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUserProfileComponent } from './simple-user-profile.component';

describe('SimpleUserProfileComponent', () => {
  let component: SimpleUserProfileComponent;
  let fixture: ComponentFixture<SimpleUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
