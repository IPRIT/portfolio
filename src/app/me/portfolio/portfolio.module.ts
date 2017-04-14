import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioItemPageComponent } from './portfolio-item-page/portfolio-item-page.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { GridListenerDirective } from "./grid-listener.directive";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    PortfolioComponent,
    PortfolioItemPageComponent,
    GridListenerDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PortfolioModule { }
