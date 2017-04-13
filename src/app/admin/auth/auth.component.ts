import { Component, OnInit } from '@angular/core';
import { AuthService, AuthState } from "./auth.service";
import { AngularFire, FirebaseAuthState } from "angularfire2";

@Component({
  selector: 'ab-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authState: AuthState;
  displayName: string;

  constructor(
    public angularFire: AngularFire,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((authState: AuthState) => {
      this.authState = authState;
    });
    this.angularFire.auth.subscribe((firebaseAuth: FirebaseAuthState) => {
      this.displayName = firebaseAuth
        ? firebaseAuth.auth.displayName : '';
    });
  }

  toggleAuth() {
    this.authState === AuthState.SignedIn
      ? this.authService.logOut() : this.authService.signIn();
  }
}
