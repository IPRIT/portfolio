import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbImageComponent } from './components/ab-image/ab-image.component';
import { AbBackgroundComponent } from './components/ab-background/ab-background.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AbImageComponent,
    AbBackgroundComponent
  ],
  exports: [
    AbImageComponent,
    AbBackgroundComponent
  ]
})
export class SharedModule { }
