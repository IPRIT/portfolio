import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechnologiesPageComponent } from './admin-technologies-page.component';

describe('AdminTechnologiesPageComponent', () => {
  let component: AdminTechnologiesPageComponent;
  let fixture: ComponentFixture<AdminTechnologiesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTechnologiesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTechnologiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
