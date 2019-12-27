import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ImageInfo } from '../model/image-info';
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
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get all images from album', inject(
    [ImageService],
    (service: ImageService) => {
      const albumName = 'any';
      const expectedPage = 1;
      const mockResponse = [mockFeaturedImageData, mockUnfeaturedImageData];

      service
        .getImagesFromAlbum(albumName, expectedPage)
        .subscribe((images: ImageInfo[]) => {
          expect(images.length).toBe(2);

          expect(images[0]).toEqual(mockFeaturedImageData);
          expect(images[1]).toEqual(mockUnfeaturedImageData);
        });

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&images&albumName=${albumName}&page=${expectedPage}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('should get images from default album if album is blank', inject(
    [ImageService],
    (service: ImageService) => {
      const expectedAlbumName = '_default';
      const expectedPage = 1;
      const mockResponse = [mockFeaturedImageData, mockUnfeaturedImageData];

      service
        .getImagesFromAlbum('', expectedPage)
        .subscribe((data: ImageInfo[]) => expect(data).toEqual(mockResponse));

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('should get images from first page if page is less than zero', inject(
    [ImageService],
    (service: ImageService) => {
      const expectedAlbumName = 'any';
      const expectedPage = 1;
      const mockResponse = [mockFeaturedImageData];

      service
        .getImagesFromAlbum(expectedAlbumName, -2)
        .subscribe((data: ImageInfo[]) => expect(data).toEqual(mockResponse));

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('should get a specified number of images if count is set', inject(
    [ImageService],
    (service: ImageService) => {
      const expectedAlbumName = 'any';
      const expectedPage = 1;
      const expectedCount = 3;
      const mockResponse = [mockFeaturedImageData];

      service
        .getImagesFromAlbum(expectedAlbumName, expectedPage, expectedCount)
        .subscribe(() => {});

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}&count=${expectedCount}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('should get image information', inject(
    [ImageService],
    (service: ImageService) => {
      const mockResponse = mockUnfeaturedImageData;

      service
        .getImageInfo(mockUnfeaturedImageData.id)
        .subscribe(
          (image: ImageInfo) => expect(image).toEqual(mockUnfeaturedImageData),
          () => fail('should not get here')
        );

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&imageData&imageId=${mockUnfeaturedImageData.id}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    }
  ));

  it('should bubble up errors to caller when getting images from album', inject(
    [ImageService],
    (service: ImageService) => {
      const expectedAlbumName = 'any';

      service
        .getImagesFromAlbum(expectedAlbumName, 1)
        .subscribe(
          () => fail('Should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );

      const req = httpTestingController.expectOne(
        `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=1`
      );
      req.flush('fake 404', { status: 404, statusText: 'Not Found' });
    }
  ));

  it('should bubble up errors to caller when getting an image’s information', inject(
    [ImageService],
    (service: ImageService) => {
      service
        .getImageInfo(1)
        .subscribe(
          () => fail('Should not get here'),
          (err: Error) => expect(err).toBeTruthy()
        );

      const req = httpTestingController.expectOne(
        'http://localhost/api/?gallery&imageData&imageId=1'
      );
      req.flush('fake 404', { status: 404, statusText: 'Not Found' });
    }
  ));
});
