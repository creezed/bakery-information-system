import { provideAnimations } from '@angular/platform-browser/animations';
import { TUI_THEME, TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ApiModule } from '@bakery-information-system/web/api-client';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { provideLottieOptions } from 'ngx-lottie';
import { apiErrorInterceptor } from '@bakery-information-system/web/core';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: TUI_THEME,
      useValue: 'tinkoff',
    },
    provideAnimations(),
    provideRouter(appRoutes),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    provideHttpClient(withInterceptors([apiErrorInterceptor])),
    importProvidersFrom(
      TuiRootModule,
      ApiModule.forRoot({ rootUrl: environment.apiUrl }),
      NgxsModule.forRoot([], {
        developmentMode: !environment.production,
      }),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsLoggerPluginModule.forRoot()
    ),
  ],
};
