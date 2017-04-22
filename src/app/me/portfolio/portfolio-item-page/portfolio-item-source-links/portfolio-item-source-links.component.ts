import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from "../../../../shared/components/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-portfolio-item-source-links',
  templateUrl: './portfolio-item-source-links.component.html',
  styleUrls: ['./portfolio-item-source-links.component.scss']
})
export class PortfolioItemSourceLinksComponent implements OnInit {

  @Input() item: PortfolioItem;

  constructor() { }

  ngOnInit() {
  }
}
