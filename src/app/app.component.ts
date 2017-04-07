import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { AbImageModel } from "./shared/components/ab-image/ab-image.model";

@Component({
  selector: 'ab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(
  ) {
  }
}
