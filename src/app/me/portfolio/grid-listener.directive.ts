import { Directive, ElementRef, Renderer2, AfterViewInit, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from "@angular/common";
import { Observable, Observer } from "rxjs";
import "rxjs/operator/throttleTime";

const GRID_COLUMN_ATTRIBUTE = 'grid-columns';
const GRID_CHECK_DEBOUNCE_MS = 200;

@Directive({
  selector: '[ab-grid-listener]'
})
export class GridListenerDirective implements AfterViewInit {

  @Input('abGridItemMin') abGridItemMin: number;
  @Input('abGridItemMax') abGridItemMax: number;

  oldParentWidth: number = 0;
  minItemWidth: number;
  maxItemWidth: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  ngAfterViewInit() {
    if (this.getPlatformType().isServer) {
      return;
    }

    this.minItemWidth = Number(this.abGridItemMin) || 100;
    this.maxItemWidth = Number(this.abGridItemMax) || 100;

    let element: HTMLElement = this.elementRef.nativeElement;

    let windowChange: Observable<any> = new Observable<any>((observer: Observer<any>) => {
      this.renderer.listen('window', 'resize', event => observer.next(event));
    });

    windowChange
      .throttleTime(GRID_CHECK_DEBOUNCE_MS)
      .subscribe(event => this.recomputeColumnsNumber(element));

    this.recomputeColumnsNumber(element);
  }

  getPlatformType(): {isBrowser: boolean, isServer: boolean} {
    return {
      isBrowser: isPlatformBrowser(this.platformId),
      isServer: isPlatformServer(this.platformId)
    }
  }

  recomputeColumnsNumber(element: HTMLElement): void {
    let parentWidth = element.offsetWidth;
    if (this.oldParentWidth !== parentWidth) {
      this.renderer.setAttribute(element, GRID_COLUMN_ATTRIBUTE, this.getColumnsNumber(element).toString());
    }
  }

  getColumnsNumber(element: HTMLElement) {
    let parentWidth = this.oldParentWidth = element.offsetWidth;
    let possibleColumns = Math.max(Math.floor(parentWidth / this.maxItemWidth), 1);
    if (parentWidth / this.maxItemWidth > possibleColumns) {
      let nextWidth = parentWidth / (possibleColumns + 1);
      if (nextWidth >= this.minItemWidth && nextWidth <= this.maxItemWidth) {
        possibleColumns++;
      }
    }
    return possibleColumns;
  }
}
