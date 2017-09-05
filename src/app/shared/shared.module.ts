import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TextParsingService } from './text-parsing.service';

import { LineSplittingPipe } from './line-splitting.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { StickyElementDirective } from './sticky-element.directive';

const CORE_COMPONENTS = [
  LineSplittingPipe,
  PaginationComponent,
  LoadSpinnerComponent,
  StickyElementDirective
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
      providers: [TextParsingService]
    };
  }
}
