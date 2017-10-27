import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from "angular-2-local-storage";
import { isPlatformServer, isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import 'rxjs/add/operator/publishReplay';

export class LanguageType {
  static EN: any[] = [ 'en', 'us', 'en-us', 'en-uk' ];
  static RU: any[] = [ 'ru', 'ru-ru' ];
}

declare type NavigatorExtended = Navigator & {
  languages: any[]
};

export declare type AvailableLanguages = 'en' | 'ru';

@Injectable()
export class LanguageProviderService {

  public availableLanguages = [ 'en', 'ru' ];
  private defaultLanguageType = LanguageType.EN;
  private storageLanguageKey = 'language';

  private language$: Subject<AvailableLanguages>;

  constructor(
    private storageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.language$ = new BehaviorSubject(this.obtainContentLanguage());
  }

  obtainContentLanguage(): AvailableLanguages {
    return <AvailableLanguages>(this.getSavedLanguage() || this.findOutUserLanguage());
  }

  saveLanguage(languageString: AvailableLanguages) {
    this.language$.next( languageString );
    this.storageService.set(this.storageLanguageKey, languageString);
  }

  getLanguage(): Observable<AvailableLanguages> {
    return this.language$;
  }

  private getSavedLanguage(): AvailableLanguages | any {
    if (this.getPlatformType().isBrowser) {
      let language = this.storageService.get(this.storageLanguageKey);
      return typeof language === 'string' ? language : null; // Storage fix workaround
    }
    return null;
  }

  private findOutUserLanguage(): AvailableLanguages {
    // todo: translate en version
    return 'ru';

    /*if (this.getPlatformType().isBrowser) {
      if (!window || !window.navigator) {
        return <AvailableLanguages>this.defaultLanguageType[0];
      }
      let navigator = <NavigatorExtended>window.navigator;
      let priorityUserLanguages = navigator.languages;
      let browserLanguage = navigator.language;
      let languageString = Array.isArray(priorityUserLanguages) && priorityUserLanguages.length > 0
        ? priorityUserLanguages[0] : browserLanguage;
      let languageType = this.getLanguageType(languageString) || this.defaultLanguageType;
      return <AvailableLanguages>languageType[0];
    } else {
      // todo(platform specific): read language from the headers
      throw new Error('Not Implemented');
    }*/
  }

  private getLanguageType(languageString: string): string[] {
    for (let languageTypeString of Object.keys(LanguageType)) {
      if (this.isLanguageTypesEqual(LanguageType[ languageTypeString ], languageString)) {
        return LanguageType[ languageTypeString ];
      }
    }
  }

  private isLanguageTypesEqual(languageType1: string[] | string, languageType2: string[] | string): boolean {
    if (!Array.isArray(languageType1)) {
      languageType1 = [].concat(languageType1);
    }
    if (!Array.isArray(languageType2)) {
      languageType2 = [].concat(languageType2);
    }
    return languageType1.some((language: string) => {
      return (<string[]>languageType2)
          .map((language: string) => language.toLowerCase())
          .indexOf(language.toLowerCase()) >= 0;
    });
  }

  private getPlatformType(): {isBrowser: boolean, isServer: boolean} {
    return {
      isBrowser: isPlatformBrowser(this.platformId),
      isServer: isPlatformServer(this.platformId)
    }
  }
}
