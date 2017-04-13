import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../routing/app.routing.animations";
import { HeaderStyleService, HeaderStyleClass } from "../shared/services/header-style/header-style.service";
import { HeaderLogos } from "../shared/services/header-logo/header-logo.service";

@Component({
  selector: 'ab-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class MainComponent implements OnInit {

  isMobileMenuOpen: boolean = false;

  constructor(
    private headerStyle: HeaderStyleService
  ) {
    headerStyle.logoService.setLogoUrl(HeaderLogos.blue);
    headerStyle.setClass(HeaderStyleClass.about);
  }

  ngOnInit() {
  }

  setMobileMenuState(state) {
    this.isMobileMenuOpen = state;
  }
}
