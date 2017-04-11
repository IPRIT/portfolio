import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeaderLogoService } from "../../services/header-logo/header-logo.service";
import { HeaderStyleService } from "../../services/header-style/header-style.service";

@Component({
  selector: 'ab-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onMobileMenuClicked = new EventEmitter<boolean>();

  constructor(
    public styleService: HeaderStyleService
  ) {
  }

  ngOnInit() {
  }

  mobileMenuClick(event) {
    this.onMobileMenuClicked.emit(true);
  }
}