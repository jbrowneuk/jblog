import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopPageComponent } from './top-page/top-page.component';
import { AboutComponent } from './about/about.component';

const homeRoutes: Routes = [
  {path: 'about', component: AboutComponent },
  {path: '', component: TopPageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [TopPageComponent, AboutComponent]
})
export class HomeModule { }
