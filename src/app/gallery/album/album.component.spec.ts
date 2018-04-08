import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { It, Mock, Times } from 'typemoq';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { GalleryFormatPipe } from '../gallery-format.pipe';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { AlbumService } from '../album.service';
import { ImageService } from '../image.service';
import { TitleService } from '../../shared/title.service';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';

import { MOCK_ALBUMDATA, MOCK_IMAGEDATA } from '../mocks/mock-data';

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
    mockAlbumService.setup(s => s.getAlbumInfo(It.isAnyString()))
      .returns(() => Observable.of(MOCK_ALBUMDATA));

    mockImageService.reset();
    mockImageService.setup(s => s.getImageInfo(It.isAnyNumber()))
      .returns(() => Observable.of(MOCK_IMAGEDATA));
    mockImageService.setup(s => s.getImagesFromAlbum(It.isAnyString(), It.isAnyNumber(), It.isAnyNumber()))
      .returns(() => Observable.of([MOCK_IMAGEDATA]));

    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        LineSplittingPipe,
        GalleryFormatPipe,
        PaginationComponent,
        ImageContainerComponent,
        ThumbnailComponent,
        AlbumComponent,
        PageHeroComponent,
        LoadSpinnerComponent
      ],
      providers: [
        { provide: AlbumService, useFactory: () => mockAlbumService.object },
        { provide: ImageService, useFactory: () => mockImageService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get album data', () => {
    fixture.detectChanges();

    expect(component.isLoadingAlbumData).toBeFalsy();
    expect(component.loadingFailed).toBeFalsy();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#album-description p').textContent)
      .toContain(MOCK_ALBUMDATA.description);
    expect(compiled.querySelector('#album-description .card-info').textContent)
      .toContain('8 images');
    expect(compiled.querySelector('#album-choice').textContent)
      .toContain('Pick a different album');
  });

  it('should set title', () => {
    mockTitleService.verify(x => x.setTitle(It.isValue(MOCK_ALBUMDATA.title)), Times.once());
  });
});
