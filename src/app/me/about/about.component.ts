import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from "../../routing/app.routing.animations";
import { AbImageModel } from "../../shared/components/ab-image/ab-image.model";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { HeaderStyleService, HeaderStyleClass } from "../../shared/services/header-style/header-style.service";
import { HeaderLogos } from "../../shared/services/header-logo/header-logo.service";
import { Technology } from "../../shared/components/portfolio-item/portfolio-item.interface";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { TransversalAnimationService } from "../../shared/components/transversal-animation/transversal-animation.service";

@Component({
  selector: 'ab-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class AboutComponent implements OnInit {

  skills: FirebaseListObservable<Technology[]>;

  skillsOrdered: Observable<Technology[]>;
  frameworks: Observable<Technology[]>;
  librariesAndTechnologies: Observable<Technology[]>;
  services: Observable<Technology[]>;
  others: Observable<Technology[]>;

  @ViewChild('misisAcmLink') misisAcmLink: ElementRef;

  constructor(
    private angularFire: AngularFire,
    private headerStyle: HeaderStyleService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private transversalAnimation: TransversalAnimationService
  ) {
    headerStyle.logoService.setLogoUrl(HeaderLogos.blue);
    headerStyle.setClass(HeaderStyleClass.about);

    this.skills = angularFire.database.list('/portfolio-technologies', {
      query: {
        orderByChild: 'priority'
      }
    });

    this.skillsOrdered = this.skills.map((skills: Technology[]) => skills.sort((a, b) => a.priority - b.priority));

    this.frameworks = this.skillsOrdered.map((skills: Technology[]) => {
      return skills.filter(skill => skill.type === 'framework');
    });
    this.librariesAndTechnologies = this.skillsOrdered.map((skills: Technology[]) => {
      return skills.filter(skill => skill.type === 'tech');
    });
    this.services = this.skillsOrdered.map((skills: Technology[]) => {
      return skills.filter(skill => skill.type === 'service');
    });
    this.others = this.skillsOrdered.map((skills: Technology[]) => {
      return skills.filter(skill => skill.type === 'other');
    });
  }

  ngOnInit() {
  }
}
