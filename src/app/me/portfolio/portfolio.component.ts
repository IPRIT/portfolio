import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../../routing/app.routing.animations";

@Component({
  selector: 'ab-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [ routerTransition() ],
  host: {'[@routerTransition]': ''}
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
