import {
  Component, OnInit, ElementRef, Input, ViewChild, EventEmitter, Output,
  Renderer2, PLATFORM_ID, OnDestroy, Inject
} from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { AbImageModel } from "../ab-image/ab-image.model";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

const IMAGE_LOADING_TIMEOUT_MS = 500;

@Component({
  selector: 'ab-background,[ab-background]',
  templateUrl: './ab-background.component.html',
  styleUrls: ['./ab-background.component.scss']
})
export class AbBackgroundComponent implements OnInit, OnDestroy {

  @ViewChild('templateRoot') templateRoot: ElementRef;
  @ViewChild('originalWrapper') originalWrapper: ElementRef;

  loadedImage: Subject<HTMLImageElement | any> = new Subject();
  loadEvent: Subscription;

  @Input() abImageModel: AbImageModel;
  @Input() abImageSrc: string;
  @Input() abImageThumbnailSrc: string;

  @Output() imageLoaded = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  ngOnInit() {
    if (!this.abImageModel) {
      this.abImageModel = new AbImageModel(
        this.abImageSrc,
        this.abImageThumbnailSrc || this.abImageSrc
      );
    }
    this.setThumbnail();
    if (this.getPlatformType().isBrowser) {
      this.loadImage();
      this.subscribeEvents();
    }
  }

  setThumbnail() {
    this.renderer.setStyle(this.originalWrapper.nativeElement, 'background-image', `url(${this.abImageModel.thumbnailSrc})`);
  }

  loadImage(): void {
    let image: HTMLImageElement = this.renderer.createElement('img');
    this.renderer.listen(image, 'load', () => {
      this.loadedImage.next( image );
      this.imageLoaded.emit( this.abImageModel );
    });
    this.renderer.setAttribute(image, 'src', this.abImageModel.originalSrc);
  }

  subscribeEvents(): void {
    this.loadEvent = this.loadedImage.subscribe(_ => {
      this.renderer.setStyle(this.originalWrapper.nativeElement, 'background-image', `url(${this.abImageModel.originalSrc})`);

      setTimeout(() => {
        requestAnimationFrame(() => {
          this.renderer.addClass(this.templateRoot.nativeElement, 'ab-background_loaded');
        });
      }, IMAGE_LOADING_TIMEOUT_MS);
    });
  }

  getPlatformType(): {isBrowser: boolean, isServer: boolean} {
    return {
      isBrowser: isPlatformBrowser(this.platformId),
      isServer: isPlatformServer(this.platformId)
    }
  }

  ngOnDestroy() {
    if (this.loadEvent) {
      this.loadEvent.unsubscribe();
    }
  }
}