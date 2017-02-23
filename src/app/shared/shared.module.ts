import { NgModule, ModuleWithProviders } from '@angular/core';

import { AlbumDescriptionPipe } from './album-description.pipe';

import { TextParsingService } from './text-parsing.service';

@NgModule({
  declarations: [AlbumDescriptionPipe],
  exports: [AlbumDescriptionPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TextParsingService]
    };
  }
}
