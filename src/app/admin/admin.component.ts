import { Component, OnInit } from '@angular/core';
import { HeaderStyleService, HeaderStyleClass } from "../shared/services/header-style/header-style.service";
import { HeaderLogos } from "../shared/services/header-logo/header-logo.service";
import { Observable } from "rxjs";
import { AuthState, AuthService } from "./auth/auth.service";

@Component({
  selector: 'ab-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isMobileMenuOpen: boolean = false;
  authState: Observable<AuthState>;

  constructor(
    public headerStyle: HeaderStyleService,
    public authService: AuthService
  ) {
    headerStyle.logoService.setLogoUrl(HeaderLogos.pink);
    headerStyle.setClass(HeaderStyleClass.portfolio);
  }

  ngOnInit() {
    this.authState = this.authService.authState.asObservable();
  }

  onMobileMenuClicked(state) {
    this.isMobileMenuOpen = state;
  }

  onMobileMenuClosed(state) {
    this.isMobileMenuOpen = state;
  }
}
