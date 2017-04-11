import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me.component';
import { AboutComponent } from './about/about.component';
import { MeRoutingModule } from "./me.routing.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PortfolioModule,
    RouterModule,
    MeRoutingModule,
    SharedModule
  ],
  declarations: [
    MeComponent,
    AboutComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MeModule { }
