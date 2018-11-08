import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ENV_PROVIDERS } from '../environments/environment';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ProjectsModule } from './projects/projects.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    HomeModule,
    ProjectsModule,
    AppRoutingModule
  ],
  providers: [ENV_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}
