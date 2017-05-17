import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ENV_PROVIDERS } from '../environments/environment';

import { SharedModule } from './shared/shared.module';
import { GalleryModule } from './gallery/gallery.module';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule.forRoot(),
    GalleryModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [ENV_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
