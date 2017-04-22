import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioItemPageComponent } from './portfolio-item-page/portfolio-item-page.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { GridListenerDirective } from "./grid-listener.directive";
import { PortfolioItemDescriptionComponent } from './portfolio-item-page/portfolio-item-description/portfolio-item-description.component';
import { PortfolioItemCardTitleComponent } from './portfolio-item-page/portfolio-item-card-title/portfolio-item-card-title.component';
import { PortfolioItemPhotosComponent } from './portfolio-item-page/portfolio-item-photos/portfolio-item-photos.component';
import { PortfolioItemTechnologiesComponent } from './portfolio-item-page/portfolio-item-technologies/portfolio-item-technologies.component';
import { PortfolioItemSourceLinksComponent } from './portfolio-item-page/portfolio-item-source-links/portfolio-item-source-links.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    PortfolioComponent,
    PortfolioItemPageComponent,
    GridListenerDirective,
    PortfolioItemDescriptionComponent,
    PortfolioItemCardTitleComponent,
    PortfolioItemPhotosComponent,
    PortfolioItemTechnologiesComponent,
    PortfolioItemSourceLinksComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PortfolioModule { }
