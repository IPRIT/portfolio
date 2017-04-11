import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";
import { HeaderLogoService } from "../header-logo/header-logo.service";

@Injectable()
export class HeaderStyleService {

  linkStyle: ReplaySubject<any> = new ReplaySubject<any>(1);
  classes: ReplaySubject<string> = new ReplaySubject<string>(1);

  constructor(
    public logoService: HeaderLogoService
  ) { }

  setLinkStyle(styles: any) {
    this.linkStyle.next( styles );
  }

  setClass(className: string) {
    this.classes.next( className );
  }
}
