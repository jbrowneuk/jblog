import { of as observableOf } from 'rxjs';
import { It, Mock, Times } from 'typemoq';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { TitleService } from '../../shared/title.service';
import { GalleryFormatPipe } from '../gallery-format.pipe';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { MOCK_ALBUMDATA, MOCK_IMAGEDATA } from '../mocks/mock-data';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { AlbumComponent } from './album.component';

describe('AlbumComponent', () => {
  const mockAlbumService = Mock.ofType<AlbumService>();
  const mockImageService = Mock.ofType<ImageService>();

  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(() => {
    mockTitleService.reset();

    mockAlbumService.reset();
    mockAlbumService
      .setup(s => s.getAlbumInfo(It.isAnyString()))
      .returns(() => observableOf(MOCK_ALBUMDATA));

    mockImageService.reset();
    mockImageService
      .setup(s => s.getImageInfo(It.isAnyNumber()))
      .returns(() => observableOf(MOCK_IMAGEDATA));
    mockImageService
      .setup(s =>
        s.getImagesFromAlbum(
          It.isAnyString(),
          It.isAnyNumber(),
          It.isAnyNumber()
        )
      )
      .returns(() => observableOf([MOCK_IMAGEDATA]));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
        LineSplittingPipe,
        GalleryFormatPipe,
        PaginationComponent,
        ImageContainerComponent,
        ThumbnailComponent,
        AlbumComponent,
        LoadSpinnerComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: AlbumService, useFactory: () => mockAlbumService.object },
        { provide: ImageService, useFactory: () => mockImageService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get album data', () => {
    fixture.detectChanges();

    expect(component.isLoadingAlbumData).toBeFalsy();
    expect(component.loadingFailed).toBeFalsy();

    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.gallery-info .image-count').textContent
    ).toContain('8 images');
    expect(compiled.querySelector('#album-choice').textContent).toContain(
      'Pick a different album'
    );
  });

  it('should set title', () => {
    mockTitleService.verify(
      x => x.setTitle(It.isValue(MOCK_ALBUMDATA.title)),
      Times.once()
    );
    expect().nothing();
  });
});
