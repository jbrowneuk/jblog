import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumComponent } from './album/album.component';
import { GalleryFormatPipe } from './gallery-format.pipe';
import { ImageContainerComponent } from './image-container/image-container.component';
import { ImageComponent } from './image/image.component';
import { InsightsComponent } from './insights/insights.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

const sectionId = 2;
const leftSection = sectionId;
const mainSection = sectionId + 0.1;
const detailSection = sectionId + 0.2;

const galleryRoutes: Routes = [
  { path: '', redirectTo: 'album/_default/page/1', pathMatch: 'full' },
  {
    path: 'albums',
    component: AlbumListComponent,
    data: { sectionId: leftSection }
  },
  {
    path: 'album/:name/page/:page',
    component: AlbumComponent,
    data: { sectionId: mainSection }
  },
  {
    path: 'album/:name',
    component: AlbumComponent,
    data: { sectionId: mainSection }
  },
  {
    path: 'view/:id',
    component: ImageComponent,
    data: { sectionId: detailSection }
  },
  {
    path: 'insights',
    component: InsightsComponent,
    data: { sectionId: sectionId + 0.5 }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(galleryRoutes), SharedModule],
  declarations: [
    AlbumComponent,
    AlbumListComponent,
    GalleryFormatPipe,
    ImageComponent,
    ImageContainerComponent,
    ThumbnailComponent,
    InsightsComponent
  ],
  exports: [ImageContainerComponent]
})
export class GalleryModule {}
