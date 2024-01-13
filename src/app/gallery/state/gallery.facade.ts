import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { getAllImages, getCurrentAlbum } from './gallery.selectors';
import { GalleryState } from './gallery.state';

@Injectable({ providedIn: 'root' })
export class GalleryFacade {
  readonly albumInfo$ = this.store.select(getCurrentAlbum);
  readonly images$ = this.store.select(getAllImages);

  constructor(private store: Store<GalleryState>) {}
}
