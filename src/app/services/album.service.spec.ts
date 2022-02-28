import { of, throwError } from 'rxjs';
import { IMock, It, Mock } from 'typemoq';

import { TestBed } from '@angular/core/testing';

import { AlbumInfo } from '../model/album-info';
import { AlbumService } from './album.service';
import { RestService } from './rest.service';

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
  let mockRestService: IMock<RestService>;
  let service: AlbumService;

  beforeEach(() => {
    mockRestService = Mock.ofType<RestService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: RestService, useFactory: () => mockRestService.object },
        AlbumService
      ]
    });

    service = TestBed.inject(AlbumService);
  });

  afterEach(() => {
    mockRestService.verifyAll();
  });

  it('should get all albums from backend', done => {
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
    const expectedUrl = 'http://localhost/api/?gallery&albumData&all';

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service.getAllAlbumInfo().subscribe({
      next: (albums: AlbumInfo[]) => {
        expect(albums.length).toBe(2);
        expect(albums[0]).toEqual(firstAlbum);
        expect(albums[1]).toEqual(secondAlbum);

        done();
      }
    });
  });

  it('should get a single album from backend', done => {
    const albumName = firstAlbum.name;
    const mockResponse = firstAlbum;
    const expectedUrl = `http://localhost/api/?gallery&albumData&albumName=${albumName}`;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service.getAlbumInfo(albumName).subscribe({
      next: (album: AlbumInfo) => {
        expect(album).toEqual(firstAlbum);

        done();
      }
    });
  });

  it('Should get default album info if name is blank', done => {
    const expectedAlbumName = '_default';
    const expectedUrl = `http://localhost/api/?gallery&albumData&albumName=${expectedAlbumName}`;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(firstAlbum));

    service.getAlbumInfo('').subscribe({
      next: (data: AlbumInfo) => {
        expect(data).toEqual(firstAlbum);

        done();
      }
    });
  });

  it('Should handle errors when getting all album info', done => {
    const expectedUrl = `http://localhost/api/?gallery&albumData&all`;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => throwError(() => new Error('mock failure')));

    service.getAllAlbumInfo().subscribe({
      next: () => fail('should not get here'),
      error: (err: Error) => {
        expect(err).toBeTruthy();

        done();
      }
    });
  });

  it('Should handle errors when getting single album info', done => {
    const name = 'fake';
    const expectedUrl = `http://localhost/api/?gallery&albumData&albumName=${name}`;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => throwError(() => new Error('mock failure')));

    service.getAlbumInfo(name).subscribe({
      next: () => fail('should not get here'),
      error: (err: Error) => {
        expect(err).toBeTruthy();

        done();
      }
    });
  });
});
