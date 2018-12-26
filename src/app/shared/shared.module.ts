import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TextParsingService } from './text-parsing.service';
import { TitleService } from './title.service';
import { TransitionCompleteService } from './transition-complete.service';

import { LineSplittingPipe } from './line-splitting.pipe';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { PageHeroComponent } from './page-hero/page-hero.component';
import { PaginationComponent } from './pagination/pagination.component';
import { StickyElementDirective } from './sticky-element.directive';
import { ParallaxScrollDirective } from './parallax-scroll.directive';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { FeatureToggleService } from './feature-toggle.service';

const CORE_COMPONENTS = [
  LineSplittingPipe,
  LoadSpinnerComponent,
  PaginationComponent,
  PageHeroComponent,
  StickyElementDirective,
  ParallaxScrollDirective,
  InfiniteScrollDirective
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  declarations: CORE_COMPONENTS,
  exports: CORE_COMPONENTS
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [FeatureToggleService, TextParsingService, TitleService, TransitionCompleteService]
    };
  }
}
