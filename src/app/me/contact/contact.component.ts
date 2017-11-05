import { Component, OnInit } from '@angular/core';
import { HeaderStyleClass, HeaderStyleService } from "../../shared/services/header-style/header-style.service";
import { HeaderLogos } from "../../shared/services/header-logo/header-logo.service";
import { routerTransition } from "../../routing/app.routing.animations";

@Component({
  selector: 'ab-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class ContactComponent implements OnInit {

  constructor(
    private headerStyle: HeaderStyleService,
  ) {
    headerStyle.logoService.setLogoUrl(HeaderLogos.yellow);
    headerStyle.setClass(HeaderStyleClass.contact);
  }

  ngOnInit() {
  }
}
