import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

import { hmrBootstrap } from './hmr';
import { getTranslationProviders } from "./i18n";

if (environment.production) {
  enableProdMode();
}
const bootstrap = () => {
  const options = { providers: getTranslationProviders() };
  return platformBrowserDynamic().bootstrapModule(AppModule, options);
};

if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}
