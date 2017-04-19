import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from "../../../../shared/components/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-portfolio-item-description',
  templateUrl: './portfolio-item-description.component.html',
  styleUrls: ['./portfolio-item-description.component.scss']
})
export class PortfolioItemDescriptionComponent implements OnInit {

  @Input() item: PortfolioItem;

  constructor() { }

  ngOnInit() {
  }
}
