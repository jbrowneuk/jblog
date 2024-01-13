import { AlbumInfo } from 'src/app/model/album-info';
import { ImageInfo } from 'src/app/model/image-info';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface GalleryState extends EntityState<ImageInfo> {
  isLoading: boolean;
  hasLoadingError: boolean;
  currentAlbum?: AlbumInfo;
}

export const galleryAdapter: EntityAdapter<ImageInfo> =
  createEntityAdapter<ImageInfo>({
    selectId: image => image.id,
    sortComparer: (d1: ImageInfo, d2: ImageInfo) =>
      d1.id === d2.id ? 0 : d1.date > d2.date ? -1 : 1
  });

export const initialGalleryState: GalleryState = galleryAdapter.getInitialState(
  {
    isLoading: false,
    hasLoadingError: false
  }
);
