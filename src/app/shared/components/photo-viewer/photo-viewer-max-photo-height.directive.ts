import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Observable, Observer } from "rxjs";

const WINDOW_RESIZE_DEBOUNCE_MS = 200;

@Directive({
  selector: '[ab-max-photo-height]'
})
export class PhotoViewerMaxPhotoHeightDirective implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    let element: HTMLElement = this.elementRef.nativeElement;

    // We can't take window resize event from the method `Observable.fromEvent`
    // because we use `renderer` for listening events
    let windowResize = new Observable<any>((observer: Observer<any>) => {
      this.renderer.listen('window', 'resize', event => observer.next(event));
    });

    windowResize
      .throttleTime(WINDOW_RESIZE_DEBOUNCE_MS)
      .debounceTime(0)
      .subscribe(event => this.recomputePhotoMaxHeight(element));

    this.recomputePhotoMaxHeight(element);
  }

  recomputePhotoMaxHeight(element: HTMLElement) {
    let parent = <HTMLElement>element.parentNode;
    let parentStyles = this.getStyle(parent);
    let parentHeight = parentStyles.height || parentStyles.getPropertyValue('height');
    let paddingTop = parentStyles.paddingTop || parentStyles.getPropertyValue('paddingTop');
    let parentHeightNumber = Number(parentHeight.replace('px', ''));
    let parentPaddingTopNumber = Number(paddingTop.replace('px', ''));

    let targetImgs = Array.from( element.querySelectorAll('img') );
    targetImgs.forEach((image: HTMLImageElement) => {
      this.renderer.setStyle(image, 'max-height', `${parentHeightNumber - 2 * parentPaddingTopNumber}px`);
    });
  }

  private getStyle(element: HTMLElement | any) {
    return window.getComputedStyle ? getComputedStyle(element, '') : element.currentStyle;
  }
}
