import { TestBed, inject } from '@angular/core/testing';

import { TransversalAnimationService } from './transversal-animation.service';

describe('TransversalAnimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransversalAnimationService]
    });
  });

  it('should ...', inject([TransversalAnimationService], (service: TransversalAnimationService) => {
    expect(service).toBeTruthy();
  }));
});
