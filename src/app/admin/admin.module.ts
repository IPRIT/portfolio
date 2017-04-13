import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminComponent } from './admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from "./auth/auth.service";
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { PortfolioItemComponent } from './portfolio/portfolio-item/portfolio-item.component';
import { FormsModule } from "@angular/forms";
import { AdminPhotoComponent } from './portfolio/portfolio-item/admin-photo/admin-photo.component';
import { AdminStyleComponent } from './portfolio/portfolio-item/admin-style/admin-style.component';
import { AdminSourceLinkComponent } from './portfolio/portfolio-item/admin-source-link/admin-source-link.component';
import { AdminTechnologyComponent } from './portfolio/portfolio-item/admin-technology/admin-technology.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    PortfolioComponent,
    AuthComponent,
    AdminMenuComponent,
    PortfolioItemComponent,
    AdminPhotoComponent,
    AdminStyleComponent,
    AdminSourceLinkComponent,
    AdminTechnologyComponent
  ],
  providers: [
    AuthService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
