import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  PortfolioItem, PortfolioItemPhoto,
  PortfolioItemStyle, PortfolioSourceLink, Technology
} from "../../../me/portfolio/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-admin-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {

  @Input() item: PortfolioItem;
  @Output() itemUpdated = new EventEmitter<PortfolioItem>();
  @Output() itemDeleted = new EventEmitter<PortfolioItem>();
  @Output() itemCopied = new EventEmitter<PortfolioItem>();

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.itemUpdated.emit( this.item );
  }

  deleteItem(event) {
    event.preventDefault();
    this.itemDeleted.emit( this.item );
  }

  copyItem(event) {
    event.preventDefault();
    this.itemCopied.emit( this.item );
  }

  appendEmptyPhoto(event) {
    event.preventDefault();
    let newPhotoItem: PortfolioItemPhoto = {
      originalSrc: '',
      thumbnailSrc: '',
      imageName: '',
      title: 'Image'
    };
    this.item.photos = (this.item.photos || []).concat( newPhotoItem );
  }

  removeEmptyPhoto(photo: PortfolioItemPhoto) {
    this.item.photos.splice(
      this.item.photos.findIndex(p => p.imageName === photo.imageName), 1
    );
  }

  appendEmptySourceLink(event) {
    event.preventDefault();
    let newSourceLink: PortfolioSourceLink = {
      title: 'GitHub Source',
      description: 'Description',
      href: 'http://github.com/IPRIT'
    };
    this.item.sourceLinks = (this.item.sourceLinks || []).concat( newSourceLink );
  }

  appendEmptyTechnology(event) {
    event.preventDefault();
    let newTechnology: Technology = {
      uid: '-'
    };
    this.item.technologies = (this.item.technologies || []).concat( newTechnology );
  }

  removeTechnologyFromTheList(technology: Technology) {
    console.log(technology);
    this.item.technologies.splice(
      this.item.technologies.findIndex(p => p.uid === technology.uid), 1
    );
  }
}
