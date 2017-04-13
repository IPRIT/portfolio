import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";
import { HeaderLogoService } from "../header-logo/header-logo.service";

export class HeaderStyleClass {
  static portfolio = 'portfolio';
  static about = 'about';
  static contact = 'contact';
}

@Injectable()
export class HeaderStyleService {

  public defaultHeaderStyleClass = HeaderStyleClass.portfolio;

  public linkStyle: ReplaySubject<any> = new ReplaySubject<any>(1);
  public classes: ReplaySubject<string> = new ReplaySubject<string>(1);

  constructor(
    public logoService: HeaderLogoService
  ) {
    this.setClass( this.defaultHeaderStyleClass );
  }

  setLinkStyle(styles: any) {
    this.linkStyle.next( styles );
  }

  setClass(className: string) {
    this.classes.next( className );
  }
}
