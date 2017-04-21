import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PortfolioItem } from "./portfolio-item.interface";
import { AbImage } from "../ab-image/ab-image.model";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'ab-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent {
  
  @Input() item: PortfolioItem;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }


  imageLoaded(image: AbImage) {
    /* this code will be executed only in browser context */
    let rootElement = <HTMLElement>this.elementRef.nativeElement;
    Observable.of(rootElement)
      .delay(200)
      .subscribe(element => this.renderer.addClass(element, 'loaded'));
  }
}
