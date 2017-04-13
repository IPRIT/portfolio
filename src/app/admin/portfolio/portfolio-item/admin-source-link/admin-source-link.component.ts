import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PortfolioSourceLink } from "../../../../me/portfolio/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-admin-source-link',
  templateUrl: './admin-source-link.component.html',
  styleUrls: ['./admin-source-link.component.scss']
})
export class AdminSourceLinkComponent implements OnInit {

  @Input() sourceLink: PortfolioSourceLink;
  @Output() sourceLinkDeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeSourceLink() {
    this.sourceLinkDeleted.emit( this.sourceLink );
  }
}
