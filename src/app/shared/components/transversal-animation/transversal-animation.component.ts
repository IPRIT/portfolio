import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TransversalAnimationService } from "./transversal-animation.service";
import { PortfolioItem } from "../portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-transversal-animation',
  templateUrl: 'transversal-animation.component.html',
  styleUrls: ['transversal-animation.component.scss']
})
export class TransversalAnimationComponent implements OnInit {

  @ViewChild('animationRoot') animationRoot: ElementRef;

  constructor(
    private animationService: TransversalAnimationService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.animationService.portfolioItemAnimation.subscribe((object: any) => {
      let { elementRef, elementModel } = object;
      this.startComponentAnimation( elementRef, elementModel );
    });
  }

  private startComponentAnimation(elementRef: ElementRef, elementModel: PortfolioItem) {
    const headerHeight = 90;

    let originalElement = elementRef.nativeElement;

    let animationLayer: HTMLElement = this.animationRoot.nativeElement;
    const animationLayerWidth = animationLayer.offsetWidth;
    const animationLayerHeight = animationLayer.offsetHeight;

    let topLeftPosition = this.animationService.getCumulativeOffset( originalElement );

    let containerX = this.renderer.createElement('div');
    this.renderer.addClass(containerX, 'animation-layer-x');
    let containerY = this.renderer.createElement('div');
    this.renderer.addClass(containerY, 'animation-layer-y');
    let containerElement = this.renderer.createElement('div');
    this.renderer.addClass(containerElement, 'animation-layer-element');
    // create element for header gradient
    let containerHeader = this.renderer.createElement('div');
    this.renderer.addClass(containerHeader, 'animation-layer-header');

    //set initial style for header
    this.setStyles(containerHeader, {
      width: '20px',
      opacity: 0,
      transform: `translateX(0) translateY(${headerHeight}px) translateZ(0) scaleX(1)`,
      'background-color': elementModel.style.themeColor,
      'background-image': elementModel.style.backgroundOverlayGradient
    });

    // set initial offset position to layer X
    this.renderer.setStyle(containerX, 'transform',
      `translateX(${topLeftPosition.left}px) scale(1) translateZ(0)`);

    // set initial offset position to layer Y
    this.renderer.setStyle(containerY, 'transform',
      `translateY(${topLeftPosition.top - this.animationService.getRootTopScroll()}px) translateZ(0)`);

    // set initial style to animation element
    let elementWidth = originalElement.offsetWidth;
    let elementHeight = originalElement.offsetHeight;
    this.setStyles(containerElement, {
      width: `${elementWidth}px`,
      height: `${elementHeight}px`,
      'background-color': elementModel.style.themeColor
    });

    this.renderer.appendChild(containerX, containerY);
    this.renderer.appendChild(containerY, containerElement);

    this.renderer.appendChild(this.animationRoot.nativeElement, containerX);
    this.renderer.appendChild(this.animationRoot.nativeElement, containerHeader);

    this.animationService.$noScroll.next(true);

    // start animation
    requestAnimationFrame(() => {
      this.renderer.addClass(containerElement, 'element-animating');
      this.setStyles(containerElement, {
        'background-color': 'white'
      });

      this.setStyles(containerX, {
        transform: `
          translateX(${0}px) 
          translateY(${0}px)
          translateZ(0) 
          scaleX(${animationLayerWidth / elementWidth})
        `
      });
      this.setStyles(containerY, {
        transform: `
          translateX(${0}px) 
          translateY(${0}px) 
          translateZ(0) 
          scaleY(${(animationLayerHeight) / elementHeight})
        `
      });
      this.setStyles(containerHeader, {
        transform: `
          translateX(0)
          translateY(90px)
          translateZ(0) 
          scaleX(${animationLayerWidth / 20})
        `,
        opacity: 1
      });
      this.animationService.$transitionStarted
        .filter(value => !value)
        .delay(200)
        .subscribe(_ => {
          this.animationService.$noScroll.next(false);
          setTimeout(() => {
            containerHeader.remove();
            containerX.remove();
          }, 1500)
        });
    });
  }

  private setStyles(element: HTMLElement, styles = {}) {
    for (let styleProperty in styles) {
      this.renderer.setStyle(element, styleProperty, styles[ styleProperty ]);
    }
  }
}
