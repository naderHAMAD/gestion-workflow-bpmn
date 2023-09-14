import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUserSidebarComponent } from './simple-user-sidebar.component';

describe('SimpleUserSidebarComponent', () => {
  let component: SimpleUserSidebarComponent;
  let fixture: ComponentFixture<SimpleUserSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleUserSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleUserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
