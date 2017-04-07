import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbBackgroundComponent } from './ab-background.component';

describe('AbBackgroundComponent', () => {
  let component: AbBackgroundComponent;
  let fixture: ComponentFixture<AbBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
