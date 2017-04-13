import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PortfolioItemStyle } from "../../../../me/portfolio/portfolio-item/portfolio-item.interface";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'ab-admin-style',
  templateUrl: './admin-style.component.html',
  styleUrls: ['./admin-style.component.scss']
})
export class AdminStyleComponent implements OnInit {

  @Input() style: PortfolioItemStyle;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
