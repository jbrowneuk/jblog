import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { GalleryModule } from './gallery/gallery.module';
import { HomeModule } from './home/home.module';
import { JournalModule } from './journal/journal.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule.forRoot(),
    GalleryModule,
    HomeModule,
    JournalModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
