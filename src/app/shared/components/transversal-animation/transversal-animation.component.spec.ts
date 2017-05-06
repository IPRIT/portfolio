import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransversalAnimationComponent } from './transversal-animation.component';

describe('TransversalAnimationComponent', () => {
  let component: TransversalAnimationComponent;
  let fixture: ComponentFixture<TransversalAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransversalAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransversalAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
