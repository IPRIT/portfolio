import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../routing/app.routing.animations";
import { HeaderStyleService } from "../shared/services/header-style/header-style.service";

const INITIAL_LOGO: string = './assets/ui/images/logo-blue.png';

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
    headerStyle.logoService.setLogoUrl(INITIAL_LOGO);
    headerStyle.setClass('about');
  }

  ngOnInit() {
  }

  setMobileMenuState(state) {
    this.isMobileMenuOpen = state;
  }
}
