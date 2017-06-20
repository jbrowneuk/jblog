import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ImageInfo } from '../image-info';

const mockImageData = {
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

export class MockImageService {
  public getImagesFromAlbum(albumName: string, pageId: number, count: number = 0): Observable<ImageInfo[]> {
    return Observable.of([mockImageData]);
  }

  public getImageInfo(imageId: number): Observable<ImageInfo> {
    return Observable.of(mockImageData);
  }

  public testHelperMethodGetMockData() {
    return mockImageData;
  }
}
