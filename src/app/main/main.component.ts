import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../routing/app.routing.animations";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
