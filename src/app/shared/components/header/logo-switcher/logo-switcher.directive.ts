import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HeaderLogoService } from "../../../services/header-logo/header-logo.service";
import { AbImage } from "../../ab-image/ab-image.model";
import { AbImageService } from "../../ab-image/ab-image.service";
import { Observable } from "rxjs";

@Directive({
  selector: '[ab-logo-switcher]'
})
export class LogoSwitcherDirective implements OnInit {

  constructor(
    private logoProvider: HeaderLogoService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private abImageService: AbImageService
  ) {
    this._loadAndGetLogoImage().subscribe((imageModel: AbImage) => {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url(${imageModel.originalSrc})`);
    });
  }

  private _loadAndGetLogoImage(): Observable<AbImage> {
    return this.logoProvider.logo.map((logo: AbImage) => {
      return Observable.combineLatest(
        this.abImageService.load(this.renderer, logo, Number.MAX_SAFE_INTEGER),
        (image: HTMLImageElement) => logo
      );
    }).switch();
  }

  ngOnInit() {
  }
}
