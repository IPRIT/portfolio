import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from "@angular/router";
import { routerTransition } from "../../../routing/app.routing.animations";
import { AbImage } from "../../../shared/components/ab-image/ab-image.model";
import {
  PortfolioItem, PortfolioItemPhoto,
  Technology
} from "../../../shared/components/portfolio-item/portfolio-item.interface";
import { AngularFire } from "angularfire2";
import { LanguageProviderService } from "../../../shared/services/language/language-provider.service";
import { HeaderStyleService } from "../../../shared/services/header-style/header-style.service";
import { MetaService } from "../../../shared/services/meta/meta.service";
import { PhotoViewerService } from "../../../shared/components/photo-viewer/photo-viewer.service";
import { Observable } from "rxjs";
import { TransversalAnimationService } from "../../../shared/components/transversal-animation/transversal-animation.service";

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
  technologyItemsNs = '/portfolio-technologies';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private angularFire: AngularFire,
    private languageService: LanguageProviderService,
    private renderer: Renderer2,
    private headerStyleProvider: HeaderStyleService,
    private metaProvider: MetaService,
    public photoViewerService: PhotoViewerService,
    private transversalAnimation: TransversalAnimationService
  ) {
  }

  ngOnInit() {
    let itemSource = this.activatedRoute.params.map(params => {
      return params.id;
    }).switchMap((id: string) => {
      return this.angularFire.database.object(this.getPortfolioItemPath(id));
    }).map((item: any) => {
      let technologiesObservables = (item.technologies || []).map(technologyUid => {
        return this.angularFire.database.object(
          this.getTechnologyItemPath(technologyUid.uid)
        )
      });
      return technologiesObservables.length ?
        Observable.combineLatest(...technologiesObservables, (...technologies: Technology[]) => {
          item.technologies = technologies;
          return item;
        }) : Observable.of(item);
    }).switch();

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
      this.transversalAnimation.$transitionStarted.next(false);
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

  getPortfolioItemPath(id: string) {
    return `${this.portfolioItemsNs}/${this.languageService.obtainContentLanguage()}/${id}`;
  }

  getTechnologyItemPath(id: string) {
    return `${this.technologyItemsNs}/${id}`;
  }

  backgroundImageLoaded(image: AbImage) {
    this.renderer.addClass(this.backgroundProtector.nativeElement, 'loaded');
  }
}