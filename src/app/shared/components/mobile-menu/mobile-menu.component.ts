import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'ab-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  @Input() stateOpen: boolean;
  @Output() onMobileMenuClosed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeMobileMenu(event) {
    this.onMobileMenuClosed.emit(false);
  }
}
