import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { HeaderStyleService } from "../../services/header-style/header-style.service";
import { AbImage } from "../ab-image/ab-image.model";
import { AuthService, AuthState } from "../../../admin/auth/auth.service";

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
  authState: Observable<AuthState>;

  constructor(
    private headerStyle: HeaderStyleService,
    public authService: AuthService
  ) {
    this.logo = headerStyle.logoService.logo.asObservable();
    this.classes = headerStyle.classes.asObservable();
  }

  ngOnInit() {
    this.authState = this.authService.authState;
  }

  closeMobileMenu(event) {
    this.onMobileMenuClosed.emit(false);
  }
}
