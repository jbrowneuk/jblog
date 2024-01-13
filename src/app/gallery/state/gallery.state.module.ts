import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { galleryReducer } from './gallery.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('gallery', galleryReducer)
    // EffectsModule.forFeature([GalleryEffects])
  ]
})
export class GalleryStateModule {}
