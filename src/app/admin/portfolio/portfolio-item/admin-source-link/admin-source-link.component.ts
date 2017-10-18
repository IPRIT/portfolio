import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PortfolioSourceLink } from "../../../../shared/components/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-admin-source-link',
  templateUrl: './admin-source-link.component.html',
  styleUrls: ['./admin-source-link.component.scss']
})
export class AdminSourceLinkComponent implements OnInit {

  @Input() sourceLink: PortfolioSourceLink;
  @Output() sourceLinkDeleted = new EventEmitter();

  linkTypes = [
    'github',
    'habrahabr',
    'external'
  ];

  constructor() { }

  ngOnInit() {
  }

  removeSourceLink() {
    this.sourceLinkDeleted.emit( this.sourceLink );
  }
}
