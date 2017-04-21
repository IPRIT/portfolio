import {
  Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter,
  Renderer2, HostListener
} from '@angular/core';
import * as Swipe from 'swipejs';
import { PhotoViewerService } from "./photo-viewer.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'ab-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit {

  @ViewChild('swipeContainer') swipeContainer: ElementRef;

  @Input() startSlide: number = 0;
  @Input() speed: number = 300;
  @Input() auto: number = 3000;
  @Input() draggable: boolean = true;
  @Input() continuous: boolean = false;
  @Input() disableScroll: boolean = true;
  @Input() stopPropagation: boolean = false;

  @Output() callback = new EventEmitter();
  @Output() transitionEnd = new EventEmitter();

  private commentShowing$ = new BehaviorSubject<boolean>(true);

  private swipe: any;

  constructor(
    public photoViewerService: PhotoViewerService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.photoViewerService.photoNumber$.subscribe((photoNumber: number) => {
      this._getOrCreateSwipe().slide(photoNumber - 1, 1);
    });
    this.photoViewerService.isOpen$
      .filter((state: boolean) => state)
      .combineLatest(this.photoViewerService.photos$, (state, photos) => photos)
      .delay(100)
      .subscribe((photos) => {
        this._createNewSwipeIfExists();
      });

    this.transitionEnd.subscribe(([ index, element ]) => {
      this.photoViewerService.setPhotoNumber(index + 1);
    });

    this.renderer.listen(document, 'keydown', (evt) => {
      evt = evt || (window && window.event);
      let isEscape = false;
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc';
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape) {
        this.photoViewerService.closePhotoViewer();
      }
    });
  }

  private _createNewSwipeIfExists() {
    if (this.swipe) {
      this.swipe.kill();
      this.swipe = null;
    }
    return this._getOrCreateSwipe();
  }

  private _getOrCreateSwipe() {
    if (this.swipe) {
      return this.swipe;
    }
    this.swipe = new Swipe(this.swipeContainer.nativeElement, {
      startSlide: this.startSlide,
      speed: this.speed,
      draggable: this.draggable,
      continuous: this.continuous,
      disableScroll: this.disableScroll,
      stopPropagation: this.stopPropagation,
      callback: (...args) => this.callback.emit(args),
      transitionEnd: (index, element) => this.transitionEnd.emit([ index, element ])
    });
    return this.swipe;
  }

  prevPhoto(evt) {
    this._getOrCreateSwipe().prev();
  }

  nextPhoto(evt) {
    this._getOrCreateSwipe().next();
  }

  close(evt?) {
    this.photoViewerService.closePhotoViewer();
    this.commentShowing$.next(true);
  }

  photoClicked(evt) {
    this.commentShowing$.next(
      !this.commentShowing$.getValue()
    );
  }

  @HostListener('window:popstate', [ '$event' ])
  onPopState(event: Event) {
    let subscription = this.photoViewerService.isOpen$
      .filter((state: boolean) => state)
      .delay(0)
      .subscribe(() => {
        subscription.unsubscribe();
        this.close();
      });
  }
}
