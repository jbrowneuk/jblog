import { enGB } from 'date-fns/locale';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import locale from '@angular/common/locales/en-GB';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ENV_PROVIDERS, environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from './shared/shared.module';
import { DATE_FNS_CONFIG } from './variables';

registerLocaleData(locale);

@NgModule({ declarations: [AppComponent, ErrorComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'jBlog',
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot([]),
        SharedModule.forRoot(),
        AppRoutingModule], providers: [
        ENV_PROVIDERS,
        { provide: LOCALE_ID, useValue: 'en-GB' },
        { provide: DATE_FNS_CONFIG, useValue: { locale: enGB } },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
