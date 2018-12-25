import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AlbumInfo } from './album-info';
import { AlbumService } from './album.service';

const firstAlbum = {
  albumId: 1,
  title: 'first album',
  name: 'first',
  description: 'longer description',
  imagesInAlbum: 1,
  imagesPerPage: 4,
  totalPages: 1,
  iconUrl: 'http://localhost:9876/img.png'
};

describe('AlbumService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get all albums from backend', inject(
    [AlbumService],
    (service: AlbumService) => {
      const secondAlbum = {
        albumId: 2,
        title: 'second album',
        name: 'second',
        description: 'second longer description',
        imagesInAlbum: 8,
        imagesPerPage: 4,
        totalPages: 2,
        iconUrl: 'http://localhost:9876/img.png'
      };

      const mockResponse = [firstAlbum, secondAlbum];

      service.getAllAlbumInfo().subscribe((albums: AlbumInfo[]) => {
        expect(albums.length).toBe(2);
        expect(albums[0]).toEqual(firstAlbum);
        expect(albums[1]).toEqual(secondAlbum);
      });

      const req = httpTestingController.expectOne(
        'http://localhost/api/?gallery&albumData&all'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('should get a single album from backend', inject(
    [AlbumService],
    (service: AlbumService) => {
      const albumName = firstAlbum.name;
      const mockResponse = firstAlbum;

      service.getAlbumInfo(albumName).subscribe((album: AlbumInfo) => {
        expect(album).toEqual(firstAlbum);
      });

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&albumData&albumName=${albumName}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('Should get default album info if name is blank', inject(
    [AlbumService],
    (service: AlbumService) => {
      const expectedAlbumName = '_default';

      service
        .getAlbumInfo('')
        .subscribe((data: AlbumInfo) => expect(data).toEqual(firstAlbum));

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&albumData&albumName=${expectedAlbumName}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(firstAlbum);
    }
  ));

  it('Should handle errors when getting all album info', inject(
    [AlbumService],
    (service: AlbumService) => {
      const emsg = 'deliberate 404 error';

      service
        .getAllAlbumInfo()
        .subscribe(
          () => fail('should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&albumData&all`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
  ));

  it('Should handle errors when getting single album info', inject(
    [AlbumService],
    (service: AlbumService) => {
      const emsg = 'deliberate 404 error';
      const name = 'fake';

      service
        .getAlbumInfo(name)
        .subscribe(
          () => fail('should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&albumData&albumName=${name}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
  ));
});
