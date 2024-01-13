import { createFeatureSelector, createSelector } from '@ngrx/store';

import { galleryAdapter, GalleryState } from './gallery.state';

const { selectAll } = galleryAdapter.getSelectors();

/** Gets the full gallery state */
export const getGalleryState = createFeatureSelector<GalleryState>('gallery');

/** Gets the current album information */
export const getCurrentAlbum = createSelector(
  getGalleryState,
  s => s.currentAlbum
);

/** Gets all images in the state */
export const getAllImages = createSelector(getGalleryState, selectAll);
