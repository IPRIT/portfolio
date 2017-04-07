import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me.component';
import { AboutComponent } from './about/about.component';
import { MeRoutingModule } from "./me.routing.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    PortfolioModule,
    RouterModule,
    MeRoutingModule
  ],
  declarations: [
    MeComponent,
    AboutComponent
  ]
})
export class MeModule { }
