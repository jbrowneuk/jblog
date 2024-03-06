import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LoginComponent } from './login/login.component';
import { SoftwareComponent } from './software/software.component';
import { SuperHeroComponent } from './super-hero/super-hero.component';
import { TopPageComponent } from './top-page/top-page.component';

const homeRoutes: Routes = [
  {
    path: 'licenses',
    component: LicensesComponent,
    data: { sectionId: 'licenses' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { sectionId: 'login' }
  },
  {
    path: '',
    component: TopPageComponent,
    data: { sectionId: 0 },
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(homeRoutes),
    SharedModule
  ],
  declarations: [
    AboutComponent,
    ArtworksComponent,
    LicensesComponent,
    LoginComponent,
    SoftwareComponent,
    SuperHeroComponent,
    TopPageComponent
  ]
})
export class HomeModule {}
