import { NgModule, ModuleWithProviders } from '@angular/core';

import { LineSplittingPipe } from './line-splitting.pipe';

import { TextParsingService } from './text-parsing.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [LineSplittingPipe, PaginationComponent],
  exports: [LineSplittingPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TextParsingService]
    };
  }
}
