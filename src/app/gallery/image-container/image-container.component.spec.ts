import { of as observableOf } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { It, Mock, Times } from 'typemoq';

import { GalleryFormatPipe } from '../gallery-format.pipe';
import { ImageService } from '../image.service';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';

import { MOCK_IMAGEDATA } from '../mocks/mock-data';

import { ImageContainerComponent } from './image-container.component';

describe('ImageContainerComponent', () => {
  const mockImageService = Mock.ofType<ImageService>();

  let component: ImageContainerComponent;
  let fixture: ComponentFixture<ImageContainerComponent>;

  const setupImagesFromAlbumCall = () => {
    mockImageService
      .setup(s =>
        s.getImagesFromAlbum(
          It.isAnyString(),
          It.isAnyNumber(),
          It.isAnyNumber()
        )
      )
      .returns(() => observableOf([MOCK_IMAGEDATA]));
  };

  beforeEach(() => {
    mockImageService.reset();
    setupImagesFromAlbumCall();

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
    expect().nothing();
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
    expect().nothing();
  });
});
