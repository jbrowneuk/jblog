import { of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageService } from '../../services/image.service';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { GalleryFormatPipe } from '../gallery-format.pipe';
import { MOCK_IMAGEDATA } from '../mocks/mock-data';
import { ImageContainerComponent } from './image-container.component';

describe('ImageContainerComponent', () => {
  let mockImageService: IMock<ImageService>;
  let component: ImageContainerComponent;
  let fixture: ComponentFixture<ImageContainerComponent>;

  beforeEach(() => {
    mockImageService = Mock.ofType<ImageService>();
    mockImageService
      .setup(s =>
        s.getImagesFromAlbum(
          It.isAnyString(),
          It.isAnyNumber(),
          It.isAnyNumber()
        )
      )
      .returns(() => of([MOCK_IMAGEDATA]));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
        ImageContainerComponent,
        GalleryFormatPipe,
        LoadSpinnerComponent
      ],
      providers: [
        { provide: ImageService, useFactory: () => mockImageService.object }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageContainerComponent);
    component = fixture.componentInstance;
    component.page = 1;
    component.albumName = 'default';

    fixture.detectChanges();
  });

  it('should update images when page changed', () => {
    const newPage = 2;

    component.page = newPage;
    component.ngOnChanges({ page: new SimpleChange(1, newPage, true) });

    mockImageService.verify(
      x =>
        x.getImagesFromAlbum(
          It.isAnyString(),
          It.isValue(newPage),
          It.isAnyNumber()
        ),
      Times.once()
    );
  });

  it('should update images when album changed', () => {
    const newAlbumName = 'anotherOneHere';

    component.albumName = newAlbumName;
    component.ngOnChanges({
      albumName: new SimpleChange('_default', newAlbumName, true)
    });

    mockImageService.verify(
      x =>
        x.getImagesFromAlbum(
          It.isValue(newAlbumName),
          It.isAnyNumber(),
          It.isAnyNumber()
        ),
      Times.once()
    );
  });

  it('should provide correct number of placeholders for loading', () => {
    expect(component.imagePlaceholders.length).toBe(16);
  });

  it('should provide correct number of placeholders for loading if image count is set', () => {
    const expectedImages = 4;
    component.imageCount = expectedImages;
    expect(component.imagePlaceholders.length).toBe(expectedImages);
  });
});
