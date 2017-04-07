import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { routerTransition } from "../../../routing/app.routing.animations";

@Component({
  selector: 'ab-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss'],
  animations: [ routerTransition() ],
  host: {'[@routerTransition]': ''}
})
export class PortfolioItemComponent implements OnInit {

  id: Observable<number>;

  constructor(
    private route: ActivatedRoute
  ) {
    this.id = route.params.map((params: Params) => {
      return +params['id'];
    });
  }

  ngOnInit() {
  }
}
