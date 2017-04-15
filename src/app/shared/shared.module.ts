import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbImageComponent } from './components/ab-image/ab-image.component';
import { AbBackgroundComponent } from './components/ab-background/ab-background.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { HeaderLogoService } from "./services/header-logo/header-logo.service";
import { HeaderStyleService } from "./services/header-style/header-style.service";
import { PortfolioItemComponent } from './components/portfolio-item/portfolio-item.component';
import { LanguageProviderService } from "./services/language/language-provider.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    AbImageComponent,
    AbBackgroundComponent,
    MobileMenuComponent,
    HeaderComponent,
    PortfolioItemComponent
  ],
  providers: [
    HeaderLogoService,
    HeaderStyleService,
    LanguageProviderService
  ],
  exports: [
    AbImageComponent,
    AbBackgroundComponent,
    MobileMenuComponent,
    HeaderComponent,
    PortfolioItemComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
