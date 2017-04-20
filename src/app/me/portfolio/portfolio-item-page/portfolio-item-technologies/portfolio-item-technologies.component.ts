import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from "../../../../shared/components/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-portfolio-item-technologies',
  templateUrl: './portfolio-item-technologies.component.html',
  styleUrls: ['./portfolio-item-technologies.component.scss']
})
export class PortfolioItemTechnologiesComponent implements OnInit {

  @Input() item: PortfolioItem;

  constructor() { }

  ngOnInit() {
  }

}
