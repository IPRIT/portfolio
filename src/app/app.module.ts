import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from "angularfire2";

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from "@angular/common";
import { SharedModule } from "./shared/shared.module";
import { MeModule } from "./me/me.module";
import { MainModule } from "./main/main.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { AppRoutingModule } from "./routing/app.routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AdminModule } from "./admin/admin.module";
import { firebaseConfig, firebaseAuthConfig } from "../environments/firebase.config";
import { NoSanitizationService } from "./shared/services/no-sanitization/no-sanitization";
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageModule } from "angular-2-local-storage";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'AbPortfolio'
    }),
    BrowserAnimationsModule,

    LocalStorageModule.withConfig({
      prefix: 'ab',
      storageType: 'localStorage'
    }),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    SharedModule,

    AppRoutingModule,

    MeModule,
    MainModule,
    AdminModule,
    NotFoundModule
  ],
  providers: [
    //{ provide: APP_BASE_HREF, useValue: '/' },
    { provide: DomSanitizer, useClass: NoSanitizationService }
  ],
  bootstrap: [ AppComponent ],
  exports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class AppModule { }
