import { AlbumInfo } from 'src/app/model/album-info';
import { ImageInfo } from 'src/app/model/image-info';

import { createAction, props } from '@ngrx/store';

export const LoadImages = createAction(
  '[Gallery Page] Load images',
  props<{ payload: string }>()
);
export const LoadImagesSuccess = createAction(
  '[Gallery Page] Successfully loaded images',
  props<{ payload: ImageInfo[] }>()
);
export const LoadImagesFailure = createAction(
  '[Gallery Page] Failed to load images'
);

export const LoadAlbumData = createAction(
  '[Gallery Page] Load album data',
  props<{ payload: string }>()
);
export const LoadAlbumDataSuccess = createAction(
  '[Gallery Page] Successfully loaded album data',
  props<{ payload: AlbumInfo }>()
);
export const LoadAlbumDataFailure = createAction(
  '[Gallery Page] Failed to load album data'
);
