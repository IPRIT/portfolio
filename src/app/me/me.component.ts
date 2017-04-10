import { Component, OnInit } from '@angular/core';
//import { routerTransition } from "../routing/app.routing.animations";

@Component({
  selector: 'ab-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
  //animations: [ routerTransition() ],
  //host: {'[@routerTransition]': ''}
})
export class MeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
