import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbLiveButtonComponent } from './ab-live-button.component';

describe('AbLiveButtonComponent', () => {
  let component: AbLiveButtonComponent;
  let fixture: ComponentFixture<AbLiveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbLiveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbLiveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
