import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../routing/app.routing.animations";
import { HeaderStyleService, HeaderStyleClass } from "../shared/services/header-style/header-style.service";
import { HeaderLogos } from "../shared/services/header-logo/header-logo.service";
import { LanguageProviderService, AvailableLanguages } from "../shared/services/language/language-provider.service";

@Component({
  selector: 'ab-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class MainComponent implements OnInit {

  isMobileMenuOpen: boolean = false;
  currentLanguage: string;

  constructor(
    private headerStyle: HeaderStyleService,
    private languageService: LanguageProviderService
  ) {
    headerStyle.logoService.setLogoUrl(HeaderLogos.blue);
    headerStyle.setClass(HeaderStyleClass.about);

    this.languageService.getLanguage().subscribe(language => {
      this.currentLanguage = language;
    });
  }

  ngOnInit() {
  }

  setMobileMenuState(state) {
    this.isMobileMenuOpen = state;
  }

  setLanguage(language) {
    this.languageService.saveLanguage( language );
  }
}
