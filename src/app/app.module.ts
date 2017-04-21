import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AngularFireModule } from "angularfire2";
import { LocalStorageModule } from "angular-2-local-storage";

import { firebaseConfig, firebaseAuthConfig } from "../environments/firebase.config";

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { MetaModule } from "./shared/services/meta/meta.module";
import { NoSanitizationService } from "./shared/services/no-sanitization/no-sanitization";
import { MeModule } from "./me/me.module";
import { MainModule } from "./main/main.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { AdminModule } from "./admin/admin.module";
import { AppRoutingModule } from "./routing/app.routing.module";
import { metaConfig } from "./routing/app.meta-config";


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
    MetaModule.forRoot(metaConfig),
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
