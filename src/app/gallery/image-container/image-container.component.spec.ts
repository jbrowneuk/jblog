import { SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { GalleryFormatPipe } from '../gallery-format.pipe';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { ImageService } from '../image.service';
import { MockImageService } from '../mocks/mock-image.service';

import { ImageContainerComponent } from './image-container.component';

describe('ImageContainerComponent', () => {
  const mockImageService = new MockImageService();
  let component: ImageContainerComponent;
  let fixture: ComponentFixture<ImageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        ImageContainerComponent,
        GalleryFormatPipe,
        ThumbnailComponent
      ],
      providers: [
        {provide: ImageService, useValue: mockImageService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update images when page changed', async(() => {
    spyOn(mockImageService, 'getImagesFromAlbum').and.callThrough();
    expect(mockImageService.getImagesFromAlbum).not.toHaveBeenCalled();

    component.page = 2;
    component.ngOnChanges({page: new SimpleChange(1, 2, true)});

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockImageService.getImagesFromAlbum).toHaveBeenCalled();
    });
  }));

  it('should update images when album changed', async(() => {
    spyOn(mockImageService, 'getImagesFromAlbum').and.callThrough();
    expect(mockImageService.getImagesFromAlbum).not.toHaveBeenCalled();

    component.albumName = 'another';
    component.ngOnChanges({albumName: new SimpleChange('_default', 'albumName', true)});

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockImageService.getImagesFromAlbum).toHaveBeenCalled();
    });
  }));

});
