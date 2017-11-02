import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../../routing/app.routing.animations";
import { HeaderStyleService, HeaderStyleClass } from "../../shared/services/header-style/header-style.service";
import { HeaderLogos } from "../../shared/services/header-logo/header-logo.service";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { PortfolioItem } from "../../shared/components/portfolio-item/portfolio-item.interface";
import { LanguageProviderService } from "../../shared/services/language/language-provider.service";
import { Observable } from "rxjs";

@Component({
  selector: 'ab-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [ routerTransition() ],
  host: {'[@routerTransition]': ''}
})
export class PortfolioComponent implements OnInit {

  public portfolioItems: FirebaseListObservable<PortfolioItem[]>;
  private portfolioItemsNs: string = '/portfolio-items';

  public portfolioAppItems: Observable<PortfolioItem[]>;
  public portfolioLibItems: Observable<PortfolioItem[]>;

  constructor(
    private headerStyle: HeaderStyleService,
    private angularFire: AngularFire,
    private languageProvider: LanguageProviderService
  ) {
    headerStyle.logoService.setLogoUrl(HeaderLogos.pink);
    headerStyle.setClass(HeaderStyleClass.portfolio);

    this.languageProvider.getLanguage().subscribe(language => {
      this.portfolioItems = angularFire.database.list(`${this.portfolioItemsNs}/${language}`);
      this.portfolioAppItems = this.portfolioItems.map(items => {
        return items.filter(item => item.type === 'app');
      });
      this.portfolioLibItems = this.portfolioItems.map(items => {
        return items.filter(item => item.type === 'lib');
      });
    });
  }

  ngOnInit() {
  }
}
