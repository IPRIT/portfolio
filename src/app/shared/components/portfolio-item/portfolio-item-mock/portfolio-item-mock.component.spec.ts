import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemMockComponent } from './portfolio-item-mock.component';

describe('PortfolioItemMockComponent', () => {
  let component: PortfolioItemMockComponent;
  let fixture: ComponentFixture<PortfolioItemMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
