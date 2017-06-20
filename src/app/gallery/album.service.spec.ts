import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

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
      providers: [
        AlbumService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should get all albums from backend',
    inject([AlbumService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        data: [
          firstAlbum,
          {
            albumId: 2,
            title: 'second album',
            name: 'second',
            description: 'second longer description',
            imagesInAlbum: 8,
            imagesPerPage: 4,
            totalPages: 2,
            iconUrl: 'http://localhost:9876/img.png'
          }
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getAllAlbumInfo().subscribe((albums: AlbumInfo[]) => {
        expect(albums.length).toBe(2);

        expect(albums[0].albumId).toBe(1);
        expect(albums[0].title).toBe('first album');
        expect(albums[0].name).toBe('first');
        expect(albums[0].description).toBe('longer description');
        expect(albums[0].imagesInAlbum).toBe(1);
        expect(albums[0].imagesPerPage).toBe(4);
        expect(albums[0].totalPages).toBe(1);
        expect(albums[0].iconUrl).toBe('http://localhost:9876/img.png');

        expect(albums[1].albumId).toBe(2);
        expect(albums[1].title).toBe('second album');
        expect(albums[1].name).toBe('second');
        expect(albums[1].description).toBe('second longer description');
        expect(albums[1].imagesInAlbum).toBe(8);
        expect(albums[1].imagesPerPage).toBe(4);
        expect(albums[1].totalPages).toBe(2);
        expect(albums[1].iconUrl).toBe('http://localhost:9876/img.png');
      });
    })
  );

  it('should get a single album from backend',
    inject([AlbumService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        data: firstAlbum
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getAlbumInfo('mockAlbum').subscribe((album: AlbumInfo) => {
        expect(album.albumId).toBe(1);
        expect(album.title).toBe('first album');
        expect(album.name).toBe('first');
        expect(album.description).toBe('longer description');
        expect(album.imagesInAlbum).toBe(1);
        expect(album.imagesPerPage).toBe(4);
        expect(album.totalPages).toBe(1);
        expect(album.iconUrl).toBe('http://localhost:9876/img.png');
      });
    })
  );
});
