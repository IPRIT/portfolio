import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemTechnologiesComponent } from './portfolio-item-technologies.component';

describe('PortfolioItemTechnologiesComponent', () => {
  let component: PortfolioItemTechnologiesComponent;
  let fixture: ComponentFixture<PortfolioItemTechnologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemTechnologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
