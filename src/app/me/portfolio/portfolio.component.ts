import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../../routing/app.routing.animations";
import { HeaderLogoService } from "../../shared/services/header-logo/header-logo.service";
import { HeaderStyleService } from "../../shared/services/header-style/header-style.service";

const INITIAL_LOGO: string = './assets/ui/images/logo-pink.png';

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
    headerStyle.logoService.setLogoUrl(INITIAL_LOGO);
    headerStyle.setClass('portfolio');
  }

  ngOnInit() {
  }
}
