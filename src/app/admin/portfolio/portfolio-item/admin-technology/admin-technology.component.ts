import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Technology } from "../../../../me/portfolio/portfolio-item/portfolio-item.interface";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'ab-admin-technology',
  templateUrl: './admin-technology.component.html',
  styleUrls: ['./admin-technology.component.scss']
})
export class AdminTechnologyComponent implements OnInit {

  @Input() technology: Technology;
  @Input() creation: boolean;
  @Output() technologyRemoved = new EventEmitter<Technology>();

  portfolioTechnologiesNs: string = '/portfolio-technologies';
  technologies: FirebaseListObservable<Technology[]>;
  technologyUid: string;

  constructor(
    public angularFire: AngularFire
  ) {
    this.technologies = angularFire.database.list(this.portfolioTechnologiesNs);
  }

  ngOnInit() {
    this.technologies.subscribe((technologies: Technology[]) => {
      console.log(technologies);
      this.technologyUid = this.technology && this.technology.uid || technologies && technologies[0].uid || '';
    });
  }

  setTechnology(technologyUid: string) {
    this.technology.uid = technologyUid;
  }

  removeFromTheList() {
    this.technologyRemoved.emit( this.technology );
  }
}
