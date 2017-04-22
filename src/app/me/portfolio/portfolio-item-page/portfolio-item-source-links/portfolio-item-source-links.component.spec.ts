import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemSourceLinksComponent } from './portfolio-item-source-links.component';

describe('PortfolioItemSourceLinksComponent', () => {
  let component: PortfolioItemSourceLinksComponent;
  let fixture: ComponentFixture<PortfolioItemSourceLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemSourceLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemSourceLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
