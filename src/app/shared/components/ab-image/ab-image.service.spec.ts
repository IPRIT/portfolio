import { TestBed, inject } from '@angular/core/testing';

import { AbImageService } from './ab-image.service';

describe('AbImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbImageService]
    });
  });

  it('should ...', inject([AbImageService], (service: AbImageService) => {
    expect(service).toBeTruthy();
  }));
});
