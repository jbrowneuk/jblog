import { of, throwError } from 'rxjs';
import { IMock, It, Mock } from 'typemoq';

import { TestBed } from '@angular/core/testing';

import { ImageInfo } from '../model/image-info';
import { ImageService } from './image.service';
import { RestService } from './rest.service';

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
  let mockRestService: IMock<RestService>;
  let service: ImageService;

  beforeEach(() => {
    mockRestService = Mock.ofType<RestService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: RestService, useFactory: () => mockRestService.object },
        ImageService
      ]
    });

    service = TestBed.get(ImageService);
  });

  afterEach(() => {
    mockRestService.verifyAll();
  });

  it('should get all images from album', done => {
    const albumName = 'any';
    const expectedPage = 1;
    const expectedUrl = `http://localhost/api/?gallery&images&albumName=${albumName}&page=${expectedPage}`;
    const mockResponse = [mockFeaturedImageData, mockUnfeaturedImageData];

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service
      .getImagesFromAlbum(albumName, expectedPage)
      .subscribe((images: ImageInfo[]) => {
        expect(images.length).toBe(2);

        expect(images[0]).toEqual(mockFeaturedImageData);
        expect(images[1]).toEqual(mockUnfeaturedImageData);

        done();
      });
  });

  it('should get images from default album if album is blank', done => {
    const expectedAlbumName = '_default';
    const expectedPage = 1;
    const expectedUrl = `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}`;
    const mockResponse = [mockFeaturedImageData, mockUnfeaturedImageData];

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service
      .getImagesFromAlbum('', expectedPage)
      .subscribe((data: ImageInfo[]) => {
        expect(data).toEqual(mockResponse);

        done();
      });
  });

  it('should get images from first page if page is less than zero', done => {
    const expectedAlbumName = 'any';
    const expectedPage = 1;
    const expectedUrl = `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}`;
    const mockResponse = [mockFeaturedImageData];

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service
      .getImagesFromAlbum(expectedAlbumName, -2)
      .subscribe((data: ImageInfo[]) => {
        expect(data).toEqual(mockResponse);

        done();
      });
  });

  it('should get a specified number of images if count is set', done => {
    const expectedAlbumName = 'any';
    const expectedPage = 1;
    const expectedCount = 3;
    const expectedUrl = `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=${expectedPage}&count=${expectedCount}`;
    const mockResponse = [mockFeaturedImageData];

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service
      .getImagesFromAlbum(expectedAlbumName, expectedPage, expectedCount)
      .subscribe(() => {
        expect().nothing();
        done();
      });
  });

  it('should get image information', done => {
    const expectedUrl = `http://localhost/api/?gallery&imageData&imageId=${mockUnfeaturedImageData.id}`;
    const mockResponse = mockUnfeaturedImageData;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service.getImageInfo(mockUnfeaturedImageData.id).subscribe(
      (image: ImageInfo) => {
        expect(image).toEqual(mockUnfeaturedImageData);

        done();
      },
      () => fail('should not get here')
    );
  });

  it('should bubble up errors to caller when getting images from album', done => {
    const expectedAlbumName = 'any';
    const expectedUrl = `http://localhost/api/?gallery&images&albumName=${expectedAlbumName}&page=1`;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => throwError(new Error('mock failure')));

    service.getImagesFromAlbum(expectedAlbumName, 1).subscribe(
      () => fail('Should not get here'),
      (err: Error) => {
        expect(err).toBeTruthy();

        done();
      }
    );
  });

  it('should bubble up errors to caller when getting an image’s information', done => {
    const expectedUrl = 'http://localhost/api/?gallery&imageData&imageId=1';

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => throwError(new Error('mock failure')));

    service.getImageInfo(1).subscribe(
      () => fail('Should not get here'),
      (err: Error) => {
        expect(err).toBeTruthy();

        done();
      }
    );
  });
});
