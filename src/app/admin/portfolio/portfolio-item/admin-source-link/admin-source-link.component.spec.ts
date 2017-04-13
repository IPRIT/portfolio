import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSourceLinkComponent } from './admin-source-link.component';

describe('AdminSourceLinkComponent', () => {
  let component: AdminSourceLinkComponent;
  let fixture: ComponentFixture<AdminSourceLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSourceLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSourceLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
