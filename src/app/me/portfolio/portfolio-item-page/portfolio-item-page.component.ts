import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { routerTransition } from "../../../routing/app.routing.animations";

@Component({
  selector: 'ab-portfolio-item-page',
  templateUrl: 'portfolio-item-page.component.html',
  styleUrls: ['portfolio-item-page.component.scss'],
  animations: [ routerTransition() ],
  host: {'[@routerTransition]': ''}
})
export class PortfolioItemPageComponent implements OnInit {

  id: number;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
  }
}
