import { MockComponents, MockPipes } from 'ng-mocks';
import { of } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { IMock, It, Mock, Times } from 'typemoq';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlbumService } from '../../services/album.service';
import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { TitleService } from '../../shared/title.service';
import { GalleryFormatPipe } from '../gallery-format.pipe';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { MOCK_ALBUMDATA } from '../mocks/mock-data';
import { AlbumComponent } from './album.component';

describe('AlbumComponent', () => {
  let mockAlbumService: IMock<AlbumService>;
  let mockTitleService: IMock<TitleService>;

  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let pageObject: AlbumPageObject;

  beforeEach(() => {
    mockTitleService = Mock.ofType();
    mockTitleService.setup(x => x.setTitle(It.isAnyString()));

    mockAlbumService = Mock.ofType();
    mockAlbumService
      .setup(s => s.getAlbumInfo(It.isAnyString()))
      .returns(() => of(MOCK_ALBUMDATA));

    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [
        MockPipes(LineSplittingPipe, GalleryFormatPipe),
        MockComponents(
          PaginationComponent,
          ImageContainerComponent,
          LoadSpinnerComponent
        ),
        AlbumComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AlbumService, useFactory: () => mockAlbumService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    pageObject = new AlbumPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get album data', () => {
    expect(component.isLoadingAlbumData).toBeFalsy();
    expect(component.loadingFailed).toBeFalsy();
    expect(pageObject.imageCountText).toContain(
      `${MOCK_ALBUMDATA.imagesInAlbum} images`
    );
    expect(pageObject.albumSelectorButton.textContent).toContain(
      'Pick another album'
    );
  });

  it('should set title', () => {
    mockTitleService.verify(
      x => x.setTitle(It.isValue(MOCK_ALBUMDATA.title)),
      Times.once()
    );
  });
});

class AlbumPageObject extends PageObjectBase<AlbumComponent> {
  get imageCountText() {
    return this.selectByDataAttribute('image-count').textContent;
  }

  get albumSelectorButton() {
    return this.selectByDataAttribute('album-selector');
  }
}
