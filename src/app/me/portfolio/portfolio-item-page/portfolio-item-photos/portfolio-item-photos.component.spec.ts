import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemPhotosComponent } from './portfolio-item-photos.component';

describe('PortfolioItemPhotosComponent', () => {
  let component: PortfolioItemPhotosComponent;
  let fixture: ComponentFixture<PortfolioItemPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
