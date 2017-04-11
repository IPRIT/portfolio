import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../../routing/app.routing.animations";
import { AbImageModel } from "../../shared/components/ab-image/ab-image.model";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { HeaderStyleService } from "../../shared/services/header-style/header-style.service";

const INITIAL_LOGO: string = './assets/ui/images/logo-blue.png';

@Component({
  selector: 'ab-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class AboutComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  mockImageInstances: AbImageModel[];

  constructor(
    private angularFire: AngularFire,
    private headerStyle: HeaderStyleService
  ) {
    headerStyle.logoService.setLogoUrl(INITIAL_LOGO);
    headerStyle.setClass('about');

    this.items = angularFire.database.list('/users', {
      query: {
        orderByChild: 'displayName'
      }
    });

    this.mockImageInstances = [
      new AbImageModel(
        '/assets/test1.png',
        '/assets/test1_thumbnail.png',
        'My image'
      ),
      new AbImageModel(
        '/assets/test2.png',
        '/assets/test2_thumbnail.png'
      )
    ];
  }

  ngOnInit() {
  }
}
