import { NgModule, ModuleWithProviders } from '@angular/core';

import { LineSplittingPipe } from './line-splitting.pipe';

import { TextParsingService } from './text-parsing.service';

@NgModule({
  declarations: [LineSplittingPipe],
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
