import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { HeaderStyleService } from "../../services/header-style/header-style.service";
import { AbImage } from "../ab-image/ab-image.model";

@Component({
  selector: 'ab-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  @Input() stateOpen: boolean;
  @Output() onMobileMenuClosed = new EventEmitter();

  logo: Observable<AbImage>;
  classes: Observable<string>;

  constructor(
    private headerStyle: HeaderStyleService
  ) {
    this.logo = headerStyle.logoService.logo.asObservable();
    this.classes = headerStyle.classes.asObservable();
  }

  ngOnInit() {
  }

  closeMobileMenu(event) {
    this.onMobileMenuClosed.emit(false);
  }
}
