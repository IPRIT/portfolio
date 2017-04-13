import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from "angularfire2";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { firebaseAuthConfig } from "../../../environments/firebase.config";

export enum AuthState {
  Undefined,
  SignedIn,
  NotSignedIn
}

@Injectable()
export class AuthService {

  authState: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(AuthState.Undefined);

  // not a security vulnerability, just for show deny message
  googleEmailsWhitelist: string[] = [ 'ipritoflex7@gmail.com' ];

  constructor(
    public angularFire: AngularFire
  ) {
    this.authState.publishReplay(1);
    this.angularFire.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState && authState.google) {
        this.authState.next(
          this.checkPermissions( authState )
        );
      } else {
        this.authState.next( AuthState.NotSignedIn );
      }
    });
  }

  checkPermissions(authState: FirebaseAuthState): AuthState {
    if (!authState || !authState.auth) {
      return AuthState.NotSignedIn;
    }
    return this.googleEmailsWhitelist.indexOf( authState.auth.email ) >= 0
      ? AuthState.SignedIn : AuthState.NotSignedIn;
  }

  signIn() {
    this.angularFire.auth.login(firebaseAuthConfig);
  }

  logOut() {
    this.angularFire.auth.logout();
  }
}
