import { TestBed, inject } from '@angular/core/testing';

import { PhotoViewerService } from './photo-viewer.service';

describe('PhotoViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoViewerService]
    });
  });

  it('should ...', inject([PhotoViewerService], (service: PhotoViewerService) => {
    expect(service).toBeTruthy();
  }));
});
