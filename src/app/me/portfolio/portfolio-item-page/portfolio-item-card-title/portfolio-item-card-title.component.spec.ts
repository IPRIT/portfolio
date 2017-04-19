import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemCardTitleComponent } from './portfolio-item-card-title.component';

describe('PortfolioItemCardTitleComponent', () => {
  let component: PortfolioItemCardTitleComponent;
  let fixture: ComponentFixture<PortfolioItemCardTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemCardTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemCardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
