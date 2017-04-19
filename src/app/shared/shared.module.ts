import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
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
import { PhotoViewerComponent } from "./components/photo-viewer/photo-viewer.component";
import { PhotoViewerService } from "./components/photo-viewer/photo-viewer.service";
import { LanguageChooserComponent } from './components/language-chooser/language-chooser.component';
import { AbImageService } from "./components/ab-image/ab-image.service";

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
    PortfolioItemComponent,
    PhotoViewerComponent,
    LanguageChooserComponent
  ],
  providers: [
    HeaderLogoService,
    HeaderStyleService,
    LanguageProviderService,
    PhotoViewerService,
    AbImageService
  ],
  exports: [
    AbImageComponent,
    AbBackgroundComponent,
    MobileMenuComponent,
    HeaderComponent,
    PortfolioItemComponent,
    PhotoViewerComponent,
    LanguageChooserComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
