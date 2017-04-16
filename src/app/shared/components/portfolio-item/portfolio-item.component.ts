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

  @Input() item: PortfolioItem | boolean;
  @ViewChild('backgroundProtector') backgroundProtector: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  imageLoaded(image: AbImage) {
    Observable.of(this.backgroundProtector.nativeElement)
      .delay(400)
      .subscribe(element => this.renderer.addClass(element, 'loaded'));
  }
}
