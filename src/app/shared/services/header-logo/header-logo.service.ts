import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";
import { AbImage } from "../../components/ab-image/ab-image.model";

export class HeaderLogos {
  static pink = './assets/ui/images/logo-pink.png';
  static blue = './assets/ui/images/logo-blue.png';
}

@Injectable()
export class HeaderLogoService {

  public defaultLogoUrl = HeaderLogos.pink;

  public logo: ReplaySubject<AbImage> = new ReplaySubject<AbImage>(1);

  constructor() {
    this.setLogoUrl( this.defaultLogoUrl );
  }

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
