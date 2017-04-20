import { Component, OnInit } from '@angular/core';
import { Technology } from "../../shared/components/portfolio-item/portfolio-item.interface";
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
  selector: 'ab-admin-technologies-page',
  templateUrl: './admin-technologies-page.component.html',
  styleUrls: ['./admin-technologies-page.component.scss']
})
export class AdminTechnologiesPageComponent implements OnInit {

  technologyItemsNs: string = '/portfolio-technologies';
  technologyItems: FirebaseListObservable<Technology[]>;

  constructor(
    private angularFire: AngularFire
  ) {
    this.fetchPortfolioItems();
  }

  ngOnInit() {
  }

  createNew() {
    let newItem: Technology = {
      name: '',
      description: '',
      link: '',
      photo: {
        originalSrc: '',
        thumbnailSrc: '',
        imageName: ''
      },
    };
    let ref = this.technologyItems.push(newItem);
    newItem.uid = ref.key;
    this.angularFire.database.object(`${this.technologyItemsNs}/${newItem.uid}`).set( newItem );
  }

  updateItem(item: Technology) {
    this.angularFire.database.object(`${this.technologyItemsNs}/${item.uid}`).set( item );
  }

  deleteItem(item: Technology) {
    this.angularFire.database.object(`${this.technologyItemsNs}/${item.uid}`).remove();
  }

  fetchPortfolioItems() {
    this.technologyItems = this.angularFire.database.list(`${this.technologyItemsNs}`);
  }
}
