import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from "@angular/router";
import { routerTransition } from "../../../routing/app.routing.animations";
import { AbImage } from "../../../shared/components/ab-image/ab-image.model";
import { PortfolioItem } from "../../../shared/components/portfolio-item/portfolio-item.interface";
import { AngularFire } from "angularfire2";
import { LanguageProviderService } from "../../../shared/services/language/language-provider.service";
import { HeaderStyleService } from "../../../shared/services/header-style/header-style.service";
import { MetaService } from "../../../shared/services/meta/meta.service";

@Component({
  selector: 'ab-portfolio-item-page',
  templateUrl: 'portfolio-item-page.component.html',
  styleUrls: ['portfolio-item-page.component.scss'],
  animations: [ routerTransition() ],
  host: {'[@routerTransition]': ''}
})
export class PortfolioItemPageComponent implements OnInit {

  @ViewChild('backgroundProtector') backgroundProtector: ElementRef;

  id: string;
  item: PortfolioItem;

  portfolioItemsNs = '/portfolio-items';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private angularFire: AngularFire,
    private languageService: LanguageProviderService,
    private renderer: Renderer2,
    private headerStyleProvider: HeaderStyleService,
    private metaProvider: MetaService
  ) {
  }

  ngOnInit() {
    let itemSource = this.activatedRoute.params.map(params => {
      return params.id;
    }).switchMap(id => {
      return this.angularFire.database.object(this.getItemPath(id))
    });

    let event = this.router.events
      .filter(event => (event instanceof NavigationEnd))
      .combineLatest(itemSource, (source1, source2) => source2)
      .delay(200)
      .subscribe((item: PortfolioItem) => {
        event.unsubscribe();
        this.metaProvider.setTitle(item.title, ' | Alex Belov');
        this.metaProvider.setTag('description', item.description);
        this.metaProvider.setTag('twitter:description', item.description);
        this.metaProvider.setTag('og:image', item.style.backgroundPhoto.originalSrc);
        this.metaProvider.setTag('theme-color', item.style.themeColor)
      });

    itemSource.subscribe((item: PortfolioItem) => {
      this.item = item;
      if (item && item.style) {
        if (item.style.headerImage) {
          this.headerStyleProvider.logoService.setLogo(item.style.headerImage);
        }
        if (item.style.headerClass) {
          this.headerStyleProvider.setClass(item.style.headerClass);
        }
      }
    });
  }

  getItemPath(id: string) {
    return `${this.portfolioItemsNs}/${this.languageService.obtainContentLanguage()}/${id}`;
  }

  backgroundImageLoaded(image: AbImage) {
    this.renderer.addClass(this.backgroundProtector.nativeElement, 'loaded');
  }
}