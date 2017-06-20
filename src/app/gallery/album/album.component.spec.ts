import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { GalleryFormatPipe } from '../gallery-format.pipe';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { AlbumService } from '../album.service';
import { MockAlbumService } from '../mocks/mock-album.service';
import { ImageService } from '../image.service';
import { MockImageService } from '../mocks/mock-image.service';

import { AlbumComponent } from './album.component';

describe('AlbumComponent', () => {
  const mockAlbumService = new MockAlbumService();
  const mockImageService = new MockImageService();
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async(() => {
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
        AlbumComponent
      ],
      providers: [
        {provide: AlbumService, useValue: mockAlbumService},
        {provide: ImageService, useValue: mockImageService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get album data', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.isLoadingAlbumData).toBeFalsy();
      expect(component.loadingFailed).toBeFalsy();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content-area > p').textContent)
        .toContain('description');
      expect(compiled.querySelector('.content-info-area > ul > li').textContent)
        .toContain('8 images');
      expect(compiled.querySelector('.button').textContent)
        .toContain('Pick a different album');
    });
  }));
});
