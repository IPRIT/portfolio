import {
  Component, OnInit, ElementRef, Input, ViewChild, EventEmitter, Output,
  Renderer2
} from '@angular/core';
import { Subject } from "rxjs";
import { AbImageModel } from "../ab-image/ab-image.model";

const IMAGE_LOADING_TIMEOUT_MS = 500;

@Component({
  selector: 'ab-background,[ab-background]',
  templateUrl: './ab-background.component.html',
  styleUrls: ['./ab-background.component.scss']
})
export class AbBackgroundComponent implements OnInit {

  @ViewChild('templateRoot') templateRoot: ElementRef;
  @ViewChild('originalWrapper') originalWrapper: ElementRef;

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
    //todo: add platform check
    this.loadImage();
    this.subscribeEvents();
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
    this.loadedImage.subscribe(_ => {
      this.renderer.setStyle(this.originalWrapper.nativeElement, 'background-image', `url(${this.abImageModel.originalSrc})`);

      setTimeout(() => {
        requestAnimationFrame(() => {
          this.renderer.addClass(this.templateRoot.nativeElement, 'ab-background_loaded');
        });
      }, IMAGE_LOADING_TIMEOUT_MS);
    });
  }
}
