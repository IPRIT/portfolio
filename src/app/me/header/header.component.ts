import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onMobileMenuClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  mobileMenuClick(event) {
    this.onMobileMenuClicked.emit(true);
  }
}
