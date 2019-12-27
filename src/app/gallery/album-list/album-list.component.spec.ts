import { of as observableOf } from 'rxjs';
import { It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlbumService } from '../../services/album.service';
import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { TitleService } from '../../shared/title.service';
import { MOCK_ALBUMDATA } from '../mocks/mock-data';
import { AlbumListComponent } from './album-list.component';

const ALBUM_LIST = [MOCK_ALBUMDATA];

describe('AlbumListComponent', () => {
  const mockAlbumService = Mock.ofType<AlbumService>();
  mockAlbumService
    .setup(s => s.getAllAlbumInfo())
    .returns(() => observableOf(ALBUM_LIST));

  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;

  beforeEach(() => {
    mockTitleService.reset();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LineSplittingPipe, AlbumListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: AlbumService, useFactory: () => mockAlbumService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load albums on component initialization', () => {
    expect(component.albums.length).toBe(ALBUM_LIST.length);
  });

  it('should set title', () => {
    mockTitleService.verify(
      x => x.setTitle(It.isValue('All albums')),
      Times.once()
    );
    expect().nothing();
  });
});
