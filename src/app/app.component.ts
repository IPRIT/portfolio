import { Component } from '@angular/core';
import { MetaService } from "./shared/services/meta/meta.service";

@Component({
  selector: 'ab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    // Do not delete this service cause it enables
    // router's events subscription at the root level
    private meta: MetaService
  ) { }
}
