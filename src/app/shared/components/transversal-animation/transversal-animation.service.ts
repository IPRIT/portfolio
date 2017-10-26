import { Injectable, ElementRef } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";
import { PortfolioItem } from "../portfolio-item/portfolio-item.interface";

@Injectable()
export class TransversalAnimationService {

  portfolioItemAnimation = new Subject<any>();
  $noScroll = new BehaviorSubject<boolean>(false);
  $transitionStarted = new BehaviorSubject<boolean>(false);

  constructor() { }

  startPortfolioItemAnimation(elementRef: ElementRef, elementModel: PortfolioItem | any) {
    this.$transitionStarted.next(true);
    this.portfolioItemAnimation.next({
      elementRef, elementModel
    });
  }

  getCumulativeOffset(element: HTMLElement | any): {top: number, left: number} {
    if (element.length > 0) {
      element = element[0];
    }
    let [ top, left ] = [ 0, 0 ];
    let elementCssPosition = this.getStyle(element).getPropertyValue('position');
    if (elementCssPosition === 'fixed') {
      top += this.getRootTopScroll();
      left += this.getRootLeftScroll();
    }
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return { top, left };
  };

  private getStyle(element: HTMLElement | any) {
    return window.getComputedStyle ? getComputedStyle(element, '') : element.currentStyle;
  }

  getRootTopScroll() {
    const rootSelector = 'ab-me';
    const rootElement = document.querySelector(rootSelector);
    return rootElement.scrollTop || 0;
  }

  getRootLeftScroll() {
    const rootSelector = 'ab-me';
    const rootElement = document.querySelector(rootSelector);
    return rootElement.scrollLeft || 0;
  }
}
