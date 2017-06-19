import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AlbumInfo } from '../album-info';

const mockAlbumData = {
  albumId: 1,
  title: 'title',
  name: 'name',
  description: 'description',
  imagesInAlbum: 8,
  imagesPerPage: 4,
  totalPages: 2,
  iconUrl: 'http://url/jpg.jpg'
};

export class MockAlbumService {
  getAllAlbumInfo(): Observable<AlbumInfo[]> {
    return Observable.of([mockAlbumData]);
  }

  getAlbumInfo(albumName: string): Observable<AlbumInfo> {
    return Observable.of(mockAlbumData);
  }
}
