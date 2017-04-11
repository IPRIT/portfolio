import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me.component';
import { AboutComponent } from './about/about.component';
import { MeRoutingModule } from "./me.routing.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "../shared/shared.module";
import { MobileMenuComponent } from "../shared/components/mobile-menu/mobile-menu.component";

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
    HeaderComponent,
    AboutComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MeModule { }
