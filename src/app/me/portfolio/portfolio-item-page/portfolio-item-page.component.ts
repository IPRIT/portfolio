import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { routerTransition } from "../../../routing/app.routing.animations";
import { AbImage } from "../../../shared/components/ab-image/ab-image.model";
import { PortfolioItem } from "../../../shared/components/portfolio-item/portfolio-item.interface";
import { AngularFire } from "angularfire2";
import { LanguageProviderService } from "../../../shared/services/language/language-provider.service";
import { HeaderStyleService } from "../../../shared/services/header-style/header-style.service";

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
    private route: ActivatedRoute,
    private angularFire: AngularFire,
    private languageService: LanguageProviderService,
    private renderer: Renderer2,
    private headerStyleProvider: HeaderStyleService
  ) {
  }

  ngOnInit() {
    this.route.params.map(params => {
      return params.id;
    }).switchMap(id => {
      return this.angularFire.database.object(this.getItemPath(id))
    }).subscribe((item: PortfolioItem) => {
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

  imageLoaded(image: AbImage) {
    this.renderer.addClass(this.backgroundProtector.nativeElement, 'loaded');
  }
}