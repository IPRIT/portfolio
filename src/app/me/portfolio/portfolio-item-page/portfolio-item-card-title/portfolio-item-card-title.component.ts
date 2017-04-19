import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ab-portfolio-item-card-title',
  templateUrl: './portfolio-item-card-title.component.html',
  styleUrls: ['./portfolio-item-card-title.component.scss']
})
export class PortfolioItemCardTitleComponent implements OnInit {

  @Input() lineColor: string;

  constructor() { }

  ngOnInit() {
  }
}
