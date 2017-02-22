import { NgModule, ModuleWithProviders } from '@angular/core';

import { TextParsingService } from './text-parsing.service';

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TextParsingService]
    };
  }
}
