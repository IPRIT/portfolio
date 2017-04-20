import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Technology, PortfolioItemPhoto } from "../../../shared/components/portfolio-item/portfolio-item.interface";

@Component({
  selector: 'ab-admin-technology-item',
  templateUrl: './admin-technology-item.component.html',
  styleUrls: ['./admin-technology-item.component.scss']
})
export class AdminTechnologyItemComponent implements OnInit {

  @Input() item: Technology;
  @Output() itemUpdated = new EventEmitter<Technology>();
  @Output() itemDeleted = new EventEmitter<Technology>();

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
}
