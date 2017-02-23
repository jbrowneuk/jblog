import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AlbumComponent } from './album/album.component';
import { ImageComponent } from './image/image.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

import { ImageService } from './image.service';
import { AlbumService } from './album.service';

import { GalleryFormatPipe } from './gallery-format.pipe';

const galleryRoutes: Routes = [
  {path: 'art', component: AlbumComponent },
  {path: 'art/album/:name', component: AlbumComponent },
  {path: 'art/view/:id', component: ImageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(galleryRoutes),
    SharedModule
  ],
  declarations: [AlbumComponent, ImageComponent, AlbumListComponent, ThumbnailComponent, GalleryFormatPipe],
  exports: [RouterModule, AlbumComponent, ImageComponent, AlbumListComponent],
  providers: [ImageService, AlbumService]
})
export class GalleryModule { }
