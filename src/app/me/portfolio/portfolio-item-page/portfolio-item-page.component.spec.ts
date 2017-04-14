import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemPageComponent } from './portfolio-item-page.component';

describe('PortfolioItemPageComponent', () => {
  let component: PortfolioItemPageComponent;
  let fixture: ComponentFixture<PortfolioItemPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
