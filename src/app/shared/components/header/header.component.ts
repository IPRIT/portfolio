import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeaderStyleService } from "../../services/header-style/header-style.service";
import { AuthService, AuthState } from "../../../admin/auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: 'ab-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onMobileMenuClicked = new EventEmitter<boolean>();

  authState: Observable<AuthState>;

  constructor(
    public styleService: HeaderStyleService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authState = this.authService.authState.asObservable();
  }

  mobileMenuClick(event) {
    this.onMobileMenuClicked.emit(true);
  }
}