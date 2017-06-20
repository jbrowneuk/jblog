import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { AlbumService } from '../album.service';
import { MockAlbumService } from '../mocks/mock-album.service';

import { AlbumListComponent } from './album-list.component';

describe('AlbumListComponent', () => {
  const mockAlbumService = new MockAlbumService();
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LineSplittingPipe, AlbumListComponent ],
      providers: [
        {provide: AlbumService, useValue: mockAlbumService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load albums on component initialization', () => {
    spyOn(mockAlbumService, 'getAllAlbumInfo');
    expect(component.albums.length).toBe(1);
  });
});
