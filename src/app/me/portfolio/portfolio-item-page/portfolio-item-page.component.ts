import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { routerTransition } from "../../../routing/app.routing.animations";
import { AbImage } from "../../../shared/components/ab-image/ab-image.model";
import { PortfolioItem } from "../../../shared/components/portfolio-item/portfolio-item.interface";
import { AngularFire } from "angularfire2";
import { LanguageProviderService } from "../../../shared/services/language/language-provider.service";

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
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.route.params.map(params => {
      return params.id;
    }).switchMap(id => {
      return this.angularFire.database.object(`${this.portfolioItemsNs}/${this.languageService.obtainContentLanguage()}/${id}`)
    }).subscribe((item: PortfolioItem) => {
      this.item = item;
    });
  }

  imageLoaded(image: AbImage) {
    this.renderer.addClass(this.backgroundProtector.nativeElement, 'loaded');
  }
}