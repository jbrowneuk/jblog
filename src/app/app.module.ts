import { enGB } from 'date-fns/locale';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en-GB';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ENV_PROVIDERS } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { DATE_FNS_CONFIG } from './variables';

registerLocaleData(locale);

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    ENV_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'en-GB' },
    { provide: DATE_FNS_CONFIG, useValue: { locale: enGB } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
