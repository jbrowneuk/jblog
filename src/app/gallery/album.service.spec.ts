import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AlbumService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it(
    'should get all albums from backend',
    inject([AlbumService, XHRBackend], (service, mockBackend) => {
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

      const mockResponse = {
        data: [firstAlbum, secondAlbum]
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getAllAlbumInfo().subscribe((albums: AlbumInfo[]) => {
        expect(albums.length).toBe(2);
        expect(albums[0]).toEqual(firstAlbum);
        expect(albums[1]).toEqual(secondAlbum);
      });
    })
  );

  it(
    'should get a single album from backend',
    inject([AlbumService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        data: firstAlbum
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getAlbumInfo('mockAlbum').subscribe((album: AlbumInfo) => {
        expect(album).toEqual(firstAlbum);
      });
    })
  );

  it(
    'Should get default album info if name is blank',
    inject([AlbumService], (service: AlbumService) => {
      const expectedAlbumName = '_default';

      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(Observable.of(null));

      service.getAlbumInfo('');

      expect(http.get).toHaveBeenCalledWith(
        `http://localhost/api/?gallery&albumData&albumName=${expectedAlbumName}`
      );
    })
  );

  it(
    'Should handle errors when getting all album info',
    inject([AlbumService], (service: AlbumService) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(Observable.throw(new Error()));

      service
        .getAllAlbumInfo()
        .subscribe(
          (response: AlbumInfo[]) => fail('should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );
    })
  );

  it(
    'Should handle errors when getting single album info',
    inject([AlbumService], (service: AlbumService) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(Observable.throw(new Error()));

      service
        .getAlbumInfo('any')
        .subscribe(
          (response: AlbumInfo) => fail('should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );
    })
  );
});
