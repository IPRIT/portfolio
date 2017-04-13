import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../../routing/app.routing.animations";
import { HeaderStyleService, HeaderStyleClass } from "../../shared/services/header-style/header-style.service";
import { HeaderLogos } from "../../shared/services/header-logo/header-logo.service";

@Component({
  selector: 'ab-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [ routerTransition() ],
  host: {'[@routerTransition]': ''}
})
export class PortfolioComponent implements OnInit {

  constructor(
    private headerStyle: HeaderStyleService
  ) {
    headerStyle.logoService.setLogoUrl(HeaderLogos.pink);
    headerStyle.setClass(HeaderStyleClass.portfolio);
  }

  ngOnInit() {
  }
}
