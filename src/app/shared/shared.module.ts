import { NgxMdModule } from 'ngx-md';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormattedTextComponent } from './formatted-text/formatted-text.component';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { LineSplittingPipe } from './line-splitting.pipe';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ParallaxScrollDirective } from './parallax-scroll.directive';
import { RelativeDatePipe } from './relative-date.pipe';
import { StickyElementDirective } from './sticky-element.directive';
import { TitleService } from './title.service';
import { TransitionCompleteService } from './transition-complete.service';
import { UserMenuComponent } from './user-menu/user-menu.component';

const CORE_COMPONENTS = [
  LineSplittingPipe,
  RelativeDatePipe,
  LoadSpinnerComponent,
  PaginationComponent,
  FormattedTextComponent,
  UserMenuComponent,
  StickyElementDirective,
  ParallaxScrollDirective,
  InfiniteScrollDirective
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild([]), NgxMdModule.forRoot()],
  declarations: CORE_COMPONENTS,
  exports: CORE_COMPONENTS
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [TitleService, TransitionCompleteService]
    };
  }
}
