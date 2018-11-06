
import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ImageInfo } from './image-info';
import { ImageService } from './image.service';

const mockFeaturedImageData = {
  id: 1,
  title: 'mock featured image',
  date: Date.now(),
  description: 'long mock image description',
  thumbnail: './thumbnail.jpg',
  src: './original.jpg',
  containingAlbums: [{ name: 'mockalbum', title: 'mock album' }],
  featured: true
};

const mockUnfeaturedImageData = {
  id: 2,
  title: 'mock unfeatured image',
  date: Date.now(),
  description: 'long mock image description - unfeatured',
  thumbnail: './thumbnail.jpg',
  src: './original.jpg',
  containingAlbums: [{ name: 'mockalbum', title: 'mock album' }],
  featured: false
};

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ImageService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it(
    'should get all images from album',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        data: [mockFeaturedImageData, mockUnfeaturedImageData]
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

      service.getImagesFromAlbum('any', 1).subscribe((images: ImageInfo[]) => {
        expect(images.length).toBe(2);

        expect(images[0]).toEqual(mockFeaturedImageData);
        expect(images[1]).toEqual(mockUnfeaturedImageData);
      });
    })
  );

  it(
    'should get images from default album if album is blank',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const expectedAlbumName = '_default';
      const expectedPage = 1;

      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(observableOf(null));

      service.getImagesFromAlbum('', expectedPage);

      expect(http.get).toHaveBeenCalledWith(
        `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}`
      );
    })
  );

  it(
    'should get images from first page if page is less than zero',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const expectedAlbumName = 'any';
      const expectedPage = 1;

      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(observableOf(null));

      service.getImagesFromAlbum(expectedAlbumName, -2);

      expect(http.get).toHaveBeenCalledWith(
        `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}`
      );
    })
  );

  it(
    'should get a specified number of images if count is set',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const expectedAlbumName = 'any';
      const expectedPage = 1;
      const expectedCount = 3;

      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(observableOf(null));

      service.getImagesFromAlbum(
        expectedAlbumName,
        expectedPage,
        expectedCount
      );

      expect(http.get).toHaveBeenCalledWith(
        `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}&count=${expectedCount}`
      );
    })
  );

  it(
    'should get a single image',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { data: mockUnfeaturedImageData };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service
        .getImagesFromAlbum('any', mockUnfeaturedImageData.id)
        .subscribe(
          (image: ImageInfo) => expect(image).toEqual(mockUnfeaturedImageData),
          (err: Error) => fail('should not get here')
        );
    })
  );

  it(
    'should get image information',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { data: mockUnfeaturedImageData };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service
        .getImageInfo('any', mockUnfeaturedImageData.id)
        .subscribe(
          (image: ImageInfo) => expect(image).toEqual(mockUnfeaturedImageData),
          (err: Error) => fail('should not get here')
        );
    })
  );

  it(
    'should bubble up errors to caller when getting images from album',
    inject([ImageService], (service) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(
        observableThrowError(new Error())
      );

      service
        .getImagesFromAlbum('any', 1)
        .subscribe(
          (image: ImageInfo) => fail('Should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );
    })
  );

  it(
    'should bubble up errors to caller when getting images information',
    inject([ImageService], (service) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(
        observableThrowError(new Error())
      );

      service
        .getImageInfo(1)
        .subscribe(
          (image: ImageInfo) => fail('Should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );
    })
  );
});
