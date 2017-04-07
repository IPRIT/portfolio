import {
  Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter,
  Renderer2
} from '@angular/core';
import { Subject } from "rxjs";
import { AbImageModel } from "./ab-image.model";

const IMAGE_LOADING_TIMEOUT_MS = 500;

@Component({
  selector: 'ab-image,[ab-image]',
  templateUrl: './ab-image.component.html',
  styleUrls: ['./ab-image.component.scss']
})
export class AbImageComponent implements OnInit {

  @ViewChild('sourceWrapper') sourceWrapper: ElementRef;
  @ViewChild('prerenderWrapper') prerenderWrapper: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('thumbnail') thumbnail: ElementRef;

  loadedImage: Subject<HTMLImageElement | any> = new Subject();

  @Input() abImageModel: AbImageModel;
  @Input() abImageSrc: string;
  @Input() abImageThumbnailSrc: string;

  @Output() imageLoaded = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (!this.abImageModel) {
      this.abImageModel = new AbImageModel(
        this.abImageSrc,
        this.abImageThumbnailSrc || this.abImageSrc
      );
    }
    this.setThumbnail();
    this.loadImage();
    this.subscribeEvents();
  }

  setThumbnail() {
    this.renderer.setAttribute(this.thumbnail.nativeElement, 'src', this.abImageModel.thumbnailSrc);
    this.renderer.setAttribute(this.image.nativeElement, 'src', this.abImageModel.thumbnailSrc);
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
    this.loadedImage.subscribe(_ => {
      this.renderer.setAttribute(this.image.nativeElement, 'src', _.src);

      setTimeout(() => {
        requestAnimationFrame(() => {
          this.renderer.removeClass(this.sourceWrapper.nativeElement, 'ab-image__source-image_hidden');
          this.renderer.addClass(this.prerenderWrapper.nativeElement, 'ab-image__pre-render_hidden');
        });
      }, IMAGE_LOADING_TIMEOUT_MS);
    });
  }
}
