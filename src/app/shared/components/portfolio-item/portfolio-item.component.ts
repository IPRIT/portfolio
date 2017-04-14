import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from "./portfolio-item.interface";

@Component({
  selector: 'ab-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {

  @Input() item: PortfolioItem | boolean;

  constructor() { }

  ngOnInit() {
  }

}
