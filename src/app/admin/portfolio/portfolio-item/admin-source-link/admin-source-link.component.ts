import { Component, OnInit, Input } from '@angular/core';
import { PortfolioSourceLink } from "../../../../me/portfolio/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-admin-source-link',
  templateUrl: './admin-source-link.component.html',
  styleUrls: ['./admin-source-link.component.scss']
})
export class AdminSourceLinkComponent implements OnInit {

  @Input() sourceLink: PortfolioSourceLink;

  constructor() { }

  ngOnInit() {
  }

}
