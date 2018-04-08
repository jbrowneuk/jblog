import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { It, Mock, Times } from 'typemoq';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { AlbumService } from '../album.service';
import { TitleService } from '../../shared/title.service';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';

import { AlbumListComponent } from './album-list.component';
import { AlbumInfo } from '../album-info';

const mockAlbumData = [{
  albumId: 1,
  title: 'title',
  name: 'name',
  description: 'description',
  imagesInAlbum: 8,
  imagesPerPage: 4,
  totalPages: 2,
  iconUrl: 'http://url/jpg.jpg'
}];

describe('AlbumListComponent', () => {
  const mockAlbumService = Mock.ofType<AlbumService>();
  mockAlbumService.setup(s => s.getAllAlbumInfo())
    .returns(() => Observable.of(mockAlbumData));

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
