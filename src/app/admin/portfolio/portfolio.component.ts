import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { PortfolioItem } from "../../shared/components/portfolio-item/portfolio-item.interface";
import { LanguageProviderService } from "../../shared/services/language/language-provider.service";

@Component({
  selector: 'ab-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioItemsNs: string = '/portfolio-items';
  portfolioItems: FirebaseListObservable<PortfolioItem[]>;
  availableLanguages: string[];
  currentLanguage: string;

  constructor(
    private angularFire: AngularFire,
    private languageProvider: LanguageProviderService
  ) {
    this.availableLanguages = languageProvider.availableLanguages;
    this.currentLanguage = languageProvider.obtainContentLanguage();

    this.fetchPortfolioItems(this.currentLanguage);
  }

  ngOnInit() {
  }

  createNew() {
    let newItem: PortfolioItem = {
      title: 'Title ' + Math.random(),
      subTitle: 'subTitle',
      shortDescription: 'shortDescription',
      description: 'description',
      demoUrl: 'http://',
      createdAtMs: Date.now(),
      photos: [],
      technologies: [],
      sourceLinks: [],
      style: {
        color: '-',
        backgroundPhoto: {
          originalSrc: '',
          thumbnailSrc: '',
          imageName: '',
          title: '',
        },
        backgroundPhotoForPage: {
          originalSrc: '',
          thumbnailSrc: '',
          imageName: '',
          title: '',
        },
        backgroundOverlayGradient: '-',
        backgroundPhotoPositionForPage: '-',
        backgroundPhotoSizeForPage: '-',
        titleLineColor: '-'
      }
    };
    let ref = this.portfolioItems.push(newItem);
    newItem.uid = ref.key;
    this.angularFire.database.object(`${this.portfolioItemsNs}/${this.currentLanguage}/${newItem.uid}`).set( newItem );
  }

  updateItem(item: PortfolioItem) {
    this.angularFire.database.object(`${this.portfolioItemsNs}/${this.currentLanguage}/${item.uid}`).set( item );
  }

  updateItemForLanguage(item: PortfolioItem, language: string) {
    this.angularFire.database.object(`${this.portfolioItemsNs}/${language}/${item.uid}`).set( item );
  }

  deleteItem(item: PortfolioItem) {
    this.angularFire.database.object(`${this.portfolioItemsNs}/${this.currentLanguage}/${item.uid}`).remove();
  }

  copyItem(item: PortfolioItem) {
    let ref = this.portfolioItems.push({ });
    let newItem = { ...item, uid: ref.key, createdAtMs: Date.now() };
    this.updateItem( newItem );
  }

  copyItemToOtherLanguages(item: PortfolioItem) {
    let languagesToCopy = this.availableLanguages.filter(
      language => language !== this.currentLanguage
    );
    for (let language of languagesToCopy) {
      let items = this.getSpecificForLanguagePortfolioItems(language);
      let ref = items.push({ });
      let newItem = { ...item, uid: ref.key, createdAtMs: Date.now() };
      this.updateItemForLanguage( newItem, language );
    }
  }

  getSpecificForLanguagePortfolioItems(language: string) {
    return this.angularFire.database.list(`${this.portfolioItemsNs}/${language}`, {
      query: {
        orderByChild: 'createdAtMs'
      }
    });
  }

  fetchPortfolioItems(language: string) {
    this.portfolioItems = this.getSpecificForLanguagePortfolioItems(language);
  }

  setLanguage(event, language) {
    this.fetchPortfolioItems(language);
  }
}
