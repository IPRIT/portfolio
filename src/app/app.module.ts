import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from "angularfire2";

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from "@angular/common";
import { environment } from "../environments/environment";
import { SharedModule } from "./shared/shared.module";
import { MeModule } from "./me/me.module";
import { MainModule } from "./main/main.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { AppRoutingModule } from "./routing/app.routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'AbPortfolio'}),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    MeModule,
    MainModule,
    NotFoundModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
