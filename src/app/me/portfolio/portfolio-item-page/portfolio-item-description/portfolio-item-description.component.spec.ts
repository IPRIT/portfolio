import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemDescriptionComponent } from './portfolio-item-description.component';

describe('PortfolioItemDescriptionComponent', () => {
  let component: PortfolioItemDescriptionComponent;
  let fixture: ComponentFixture<PortfolioItemDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
