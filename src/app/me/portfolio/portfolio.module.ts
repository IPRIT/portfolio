import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioItemComponent } from './portfolio-item/portfolio-item.component';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PortfolioComponent,
    PortfolioItemComponent
  ]
})
export class PortfolioModule { }
