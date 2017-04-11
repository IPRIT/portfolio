import { TestBed, inject } from '@angular/core/testing';
import { HeaderStyleService } from "./header-style.service";

describe('LogoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderStyleService]
    });
  });

  it('should ...', inject([HeaderStyleService], (service: HeaderStyleService) => {
    expect(service).toBeTruthy();
  }));
});
