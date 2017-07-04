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
  containingAlbums: [
    { name: 'mockalbum', title: 'mock album' }
  ],
  featured: true
};

const mockUnfeaturedImageData = {
  id: 2,
  title: 'mock unfeatured image',
  date: Date.now(),
  description: 'long mock image description - unfeatured',
  thumbnail: './thumbnail.jpg',
  src: './original.jpg',
  containingAlbums: [
    { name: 'mockalbum', title: 'mock album' }
  ],
  featured: false
};

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ImageService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should get all images from album',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { data: [mockFeaturedImageData, mockUnfeaturedImageData] };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getImagesFromAlbum('any', 1).subscribe((images: ImageInfo[]) => {
        expect(images.length).toBe(2);

        expect(images[0].id).toBe(1);
        expect(images[0].title).toBe('mock featured image');
        expect(images[0].featured).toBeTruthy();

        expect(images[1].id).toBe(2);
        expect(images[1].title).toBe('mock unfeatured image');
        expect(images[1].featured).toBeFalsy();
      });
  }));

  it('should get a single image',
    inject([ImageService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { data: mockUnfeaturedImageData };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getImagesFromAlbum('any', 1).subscribe((image: ImageInfo) => {
        expect(image.id).toBe(2);
        expect(image.title).toBe('mock unfeatured image');
        expect(image.featured).toBeFalsy();
      });
  }));
});
