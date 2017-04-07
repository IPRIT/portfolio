import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbImageComponent } from './ab-image.component';

describe('AbImageComponent', () => {
  let component: AbImageComponent;
  let fixture: ComponentFixture<AbImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
