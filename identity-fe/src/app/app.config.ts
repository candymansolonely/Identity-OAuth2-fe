import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppConfigService } from '@/services/app-config.service';
import { provideI18n } from 'common-lib/src/lib/i18n/i18n.config';
import { MessageService } from 'primeng/api';
import { provideOAuthClient } from 'angular-oauth2-oidc';

// App config initializer
function initAppConfigProvider() {
  return () => {
    const appConfigService = inject(AppConfigService);
    return appConfigService.load();
  };
}

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(
      routes,
      withInMemoryScrolling(
        {
          anchorScrolling: 'enabled',
          scrollPositionRestoration: 'enabled'
        }
      )),
    provideHttpClient(withFetch()),
    provideOAuthClient(),
    provideAnimationsAsync(),
    providePrimeNG(
      {
        theme:
        {
          preset: MyPreset,
          options:
          {
            darkModeSelector: '.app-dark'
          }
        }
      }
    ),
    provideI18n(),
    provideAppInitializer(initAppConfigProvider()), // load app config
  ]
};
