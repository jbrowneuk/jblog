import { AlbumInfo } from '../../model/album-info';

export const MOCK_ALBUMDATA: AlbumInfo = {
  albumId: 1,
  title: 'title',
  name: 'Album name',
  description: 'Album description',
  imagesInAlbum: 8,
  imagesPerPage: 4,
  totalPages: 2,
  iconUrl: '//placehold.it/200x200'
};

export const MOCK_IMAGEDATA = {
  id: 1,
  title: 'Image title',
  date: 123456789,
  description: 'Image description',
  thumbnail: '//placehold.it/300x200',
  src: '//placehold.it/1024x768',
  containingAlbums: [
    { name: 'name', title: 'album name' },
    { name: 'name2', title: 'album name 2' }
  ],
  featured: false
};
