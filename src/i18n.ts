import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { TRANSLATION as ru } from './locale/messages.ru';
import { TRANSLATION as en } from './locale/messages.en';
import { LanguageProviderService } from "./app/shared/services/language/language-provider.service";
import { LocalStorageService } from "angular-2-local-storage";

export function getTranslationProviders(): Object[] {
  let languageProvider = new LanguageProviderService(new LocalStorageService({
    prefix: 'ab',
    storageType: 'localStorage'
  }), 'browser');
  // Get locale id from the global
  let locale = languageProvider.obtainContentLanguage();
  let availableTranslations = { en, ru };
  const translations = availableTranslations[ locale ] || availableTranslations.en;
  return [
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: LOCALE_ID, useValue: locale }
  ];
}