import { AlbumInfo } from '../album-info';

export const MOCK_ALBUMDATA: AlbumInfo = {
  albumId: 1,
  title: 'title',
  name: 'name',
  description: 'description',
  imagesInAlbum: 8,
  imagesPerPage: 4,
  totalPages: 2,
  iconUrl: 'http://url/jpg.jpg'
};

export const MOCK_IMAGEDATA = {
  id: 1,
  title: 'img_title',
  date: 123456789,
  description: 'img_desc',
  thumbnail: 'http://localhost/thumb.jpg',
  src: 'http://localhost/img.jpg',
  containingAlbums: [
    {name: 'name', title: 'album name'},
    {name: 'name2', title: 'album name 2'}
  ],
  featured: false
};
