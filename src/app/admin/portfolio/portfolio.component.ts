import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { PortfolioItem } from "../../shared/components/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioItemsNs: string = '/portfolio-items';
  portfolioItems: FirebaseListObservable<PortfolioItem[]>;

  constructor(
    private angularFire: AngularFire
  ) {
    this.portfolioItems = angularFire.database.list(this.portfolioItemsNs, {
      query: {
        orderByChild: 'createdAtMs'
      }
    });
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
          title: 'Name',
        },
        backgroundPhotoForPage: {
          originalSrc: '',
          thumbnailSrc: '',
          imageName: '',
          title: 'Name',
        },
        backgroundOverlayGradient: '-',
        backgroundPhotoPosition: '-',
        backgroundPhotoPositionForPage: '-',
        backgroundPhotoSize: '-',
        backgroundPhotoSizeForPage: '-',
        backgroundOverlayColor: '-'
      }
    };
    let ref = this.portfolioItems.push(newItem);
    newItem.uid = ref.key;
    this.angularFire.database.object(`${this.portfolioItemsNs}/${newItem.uid}`).set( newItem );
  }

  updateItem(item: PortfolioItem) {
    this.angularFire.database.object(`${this.portfolioItemsNs}/${item.uid}`).set( item );
  }

  deleteItem(item: PortfolioItem) {
    this.angularFire.database.object(`${this.portfolioItemsNs}/${item.uid}`).remove();
  }

  copyItem(item: PortfolioItem) {
    let ref = this.portfolioItems.push({ });
    let newItem = { ...item, uid: ref.key, createdAtMs: Date.now() };
    this.updateItem( newItem );
  }
}
