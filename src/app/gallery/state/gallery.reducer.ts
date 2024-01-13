import { createReducer, on } from '@ngrx/store';

import * as galleryActions from './gallery.actions';
import { galleryAdapter, initialGalleryState } from './gallery.state';

export const galleryReducer = createReducer(
  initialGalleryState,

  on(galleryActions.LoadAlbumData, state => ({
    ...state,
    isLoading: true,
    hasLoadingError: false
  })),
  on(galleryActions.LoadAlbumDataSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    currentAlbum: payload
  })),
  on(galleryActions.LoadAlbumDataFailure, state => ({
    ...state,
    isLoading: false,
    hasLoadingError: true
  })),

  on(galleryActions.LoadImages, state => ({
    ...state,
    isLoading: true,
    hasLoadingError: false
  })),
  on(galleryActions.LoadImagesSuccess, (state, { payload }) =>
    galleryAdapter.setAll(payload, { ...state, isLoading: false })
  ),
  on(galleryActions.LoadImagesFailure, state => ({
    ...state,
    hasLoadingError: true
  }))
);
