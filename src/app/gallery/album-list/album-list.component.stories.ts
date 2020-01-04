import { of } from 'rxjs';

import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf } from '@storybook/angular';

import { AlbumService } from '../../services/album.service';
import { TitleService } from '../../shared/title.service';
import { MOCK_ALBUMDATA } from '../mocks/mock-data';
import { AlbumListComponent } from './album-list.component';

const mockTitle = {
  setTitle: () => {}
};

const mockAlbum = {
  getAllAlbumInfo: () => of([MOCK_ALBUMDATA])
};

const moduleMetadata: NgModule = {
  imports: [RouterTestingModule],
  providers: [
    { provide: TitleService, useValue: mockTitle },
    { provide: AlbumService, useValue: mockAlbum }
  ]
};

storiesOf('Gallery', module).add('Album list', () => ({
  component: AlbumListComponent,
  moduleMetadata,
  props: {}
}));
