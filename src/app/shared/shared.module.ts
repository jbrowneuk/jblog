import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxMdModule } from 'ngx-md';

import { TitleService } from './title.service';
import { TransitionCompleteService } from './transition-complete.service';

import { LineSplittingPipe } from './line-splitting.pipe';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormattedTextComponent } from './formatted-text/formatted-text.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { LoginComponent } from './login/login.component';
import { StickyElementDirective } from './sticky-element.directive';
import { ParallaxScrollDirective } from './parallax-scroll.directive';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

const CORE_COMPONENTS = [
  LineSplittingPipe,
  LoadSpinnerComponent,
  PaginationComponent,
  FormattedTextComponent,
  UserMenuComponent,
  LoginComponent,
  StickyElementDirective,
  ParallaxScrollDirective,
  InfiniteScrollDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
    NgxMdModule.forRoot()
  ],
  declarations: CORE_COMPONENTS,
  exports: CORE_COMPONENTS
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TitleService, TransitionCompleteService]
    };
  }
}
