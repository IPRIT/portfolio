import { Component, OnInit } from '@angular/core';
//import { routerTransition } from "../../routing/app.routing.animations";
import { AbImageModel } from "../../shared/components/ab-image/ab-image.model";
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
  selector: 'ab-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  //animations: [routerTransition()],
  //host: {'[@routerTransition]': ''}
})
export class AboutComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  mockImageInstances: AbImageModel[];

  constructor(
    private angularFire: AngularFire
  ) {
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
      )/*,
       new AbImageModel(
       'http://img.phombo.com/img1/photocombo/1729797/Wallpaper_Wizard_Lite-199___WallpaperWizard-3934707219.jpg',
       'http://img8.sputnik.ru/?key=48cb5bbca4d9b19b54c81c59a0608b926cc6c93f'
       )*/
    ];
  }

  ngOnInit() {
  }

}
