
import {of as observableOf,  Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { It, Mock, Times } from 'typemoq';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { AlbumService } from '../album.service';
import { TitleService } from '../../shared/title.service';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { MOCK_ALBUMDATA } from '../mocks/mock-data';

import { AlbumListComponent } from './album-list.component';

describe('AlbumListComponent', () => {
  const mockAlbumService = Mock.ofType<AlbumService>();
  mockAlbumService.setup(s => s.getAllAlbumInfo())
    .returns(() => observableOf([MOCK_ALBUMDATA]));

  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;

  beforeEach(() => {
    mockTitleService.reset();

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LineSplittingPipe, PageHeroComponent, AlbumListComponent ],
      providers: [
        { provide: AlbumService, useFactory: () => mockAlbumService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load albums on component initialization', () => {
    expect(component.albums.length).toBe(1);
  });

  it('should set title', () => {
    mockTitleService.verify(x => x.setTitle(It.isValue('All albums')), Times.once());
  });
});
