import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaService } from "./meta.service";
import { RouterModule } from "@angular/router";
import { MetaConfig } from "./meta.config";

export const META_CONFIG = new InjectionToken('meta config');

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MetaModule {
  static forRoot(metaConfig: MetaConfig = { useTitleSuffix: false, defaults: {} }): ModuleWithProviders {
    return {
      ngModule: MetaModule,
      providers: [
        { provide: META_CONFIG, useValue: metaConfig},
        MetaService
      ]
    };
  }
}
