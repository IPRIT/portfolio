import {
  Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter,
  Renderer2, OnDestroy, PLATFORM_ID, Inject, AfterViewInit
} from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { AbImageModel } from "./ab-image.model";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AbImageService } from "./ab-image.service";

const IMAGE_LOADING_TIMEOUT_MS = 100;

@Component({
  selector: 'ab-image,[ab-image]',
  templateUrl: './ab-image.component.html',
  styleUrls: ['./ab-image.component.scss']
})
export class AbImageComponent implements OnInit, OnDestroy {

  @ViewChild('sourceWrapper') sourceWrapper: ElementRef;
  @ViewChild('prerenderWrapper') prerenderWrapper: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('thumbnail') thumbnail: ElementRef;

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
    this.renderer.setAttribute(this.thumbnail.nativeElement, 'src', this.abImageModel.thumbnailSrc);
    this.renderer.setAttribute(this.image.nativeElement, 'src', this.abImageModel.thumbnailSrc);
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
      this.renderer.setAttribute(this.image.nativeElement, 'src', this.abImageModel.originalSrc);

      setTimeout(() => {
        requestAnimationFrame(() => {
          this.renderer.removeClass(this.sourceWrapper.nativeElement, 'ab-image__source-image_hidden');
          this.renderer.addClass(this.prerenderWrapper.nativeElement, 'ab-image__pre-render_hidden');
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
