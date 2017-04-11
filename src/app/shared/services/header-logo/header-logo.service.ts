import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";
import { AbImage } from "../../components/ab-image/ab-image.model";

@Injectable()
export class HeaderLogoService {

  logo: ReplaySubject<AbImage> = new ReplaySubject<AbImage>(1);

  constructor() { }

  setLogoUrl(logoUrl: string) {
    this.logo.next({ originalSrc: logoUrl });
  }

  setLogo(logo: AbImage) {
    this.logo.next(logo);
  }

  getLogo(): ReplaySubject<AbImage> {
    return this.logo;
  }
}
