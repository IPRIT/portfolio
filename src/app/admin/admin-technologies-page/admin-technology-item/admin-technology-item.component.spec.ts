import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechnologyItemComponent } from './admin-technology-item.component';

describe('AdminTechnologyItemComponent', () => {
  let component: AdminTechnologyItemComponent;
  let fixture: ComponentFixture<AdminTechnologyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTechnologyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTechnologyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
