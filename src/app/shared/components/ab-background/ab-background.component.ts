import {
  Component, OnInit, ElementRef, Input, ViewChild, EventEmitter, Output,
  Renderer2, PLATFORM_ID, OnDestroy, Inject
} from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { AbImageModel } from "../ab-image/ab-image.model";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AbImageService } from "../ab-image/ab-image.service";

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
    @Inject(PLATFORM_ID) private platformId: string,
    private abImageService: AbImageService
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
    this.abImageService.load( this.renderer, this.abImageModel )
      .subscribe((image: HTMLImageElement) => {
        this.loadedImage.next( image );
        this.imageLoaded.emit( this.abImageModel );
      });
  }

  subscribeEvents(): void {
    this.loadEvent = this.loadedImage.subscribe(_ => {

      setTimeout(() => {
        requestAnimationFrame(() => {
          this.renderer.setStyle(this.originalWrapper.nativeElement, 'background-image', `url(${this.abImageModel.originalSrc})`);
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
