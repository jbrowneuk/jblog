import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en-GB';

import { ENV_PROVIDERS } from '../environments/environment';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';

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
  providers: [ENV_PROVIDERS, { provide: LOCALE_ID, useValue: 'en-GB' } ],
  bootstrap: [AppComponent]
})
export class AppModule {}
