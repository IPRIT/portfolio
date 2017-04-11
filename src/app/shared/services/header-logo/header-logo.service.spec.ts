import { TestBed, inject } from '@angular/core/testing';
import { HeaderLogoService } from "./header-logo.service";

describe('LogoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderLogoService]
    });
  });

  it('should ...', inject([HeaderLogoService], (service: HeaderLogoService) => {
    expect(service).toBeTruthy();
  }));
});
