import { Component, OnInit } from '@angular/core';
import { LanguageProviderService } from "../../services/language/language-provider.service";

@Component({
  selector: 'ab-language-chooser',
  templateUrl: './language-chooser.component.html',
  styleUrls: ['./language-chooser.component.scss']
})
export class LanguageChooserComponent {

  currentLanguage: string;

  constructor(
    private languageService: LanguageProviderService
  ) {
    this.languageService.getLanguage()
      .do((language: string) => {
        this.currentLanguage = language;
      })
      .skip(1)
      .subscribe(() => {
        if (window && (<any>window).reload) {
          (<any>window).reload(true);
        } else {
          location.href = location.href;
        }
      });
  }

  setLanguage(language) {
    this.languageService.saveLanguage( language );
  }
}
