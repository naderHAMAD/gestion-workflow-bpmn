import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUserLayoutComponent } from './simple-user-layout.component';

describe('SimpleUserLayoutComponent', () => {
  let component: SimpleUserLayoutComponent;
  let fixture: ComponentFixture<SimpleUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleUserLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
