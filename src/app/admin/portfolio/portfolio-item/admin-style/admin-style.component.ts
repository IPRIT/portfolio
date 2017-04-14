import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { PortfolioItemStyle } from "../../../../shared/components/portfolio-item/portfolio-item.interface";

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
