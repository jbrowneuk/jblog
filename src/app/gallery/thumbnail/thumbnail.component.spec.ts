import { MockPipe } from 'ng-mocks';
import { AlbumNameTitlePair } from 'src/app/model/image-info';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageObjectBase } from '../../lib/testing/page-object.base';
import { GalleryFormatPipe } from '../gallery-format.pipe';
import { MOCK_IMAGEDATA } from '../mocks/mock-data';
import { ThumbnailComponent } from './thumbnail.component';

const testGallerySeparator = '|';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;
  let componentObject: ComponentObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ThumbnailComponent,
        MockPipe(GalleryFormatPipe, (galleries: AlbumNameTitlePair[]) =>
          galleries.map(g => g.title).join(testGallerySeparator)
        )
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    componentObject = new ComponentObject(fixture);
    component = fixture.componentInstance;
    component.data = MOCK_IMAGEDATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render elements correctly', () => {
    const imageElement = componentObject.imageElement;
    expect(imageElement.src.endsWith(MOCK_IMAGEDATA.thumbnail)).toBe(true); // .endsWith() as the protocol will be added

    expect(componentObject.titleText).toBe(MOCK_IMAGEDATA.title);

    const expectedTitles = MOCK_IMAGEDATA.containingAlbums
      .map(g => g.title)
      .join(testGallerySeparator);
    expect(componentObject.galleriesText).toBe(expectedTitles);
  });
});

class ComponentObject extends PageObjectBase<ThumbnailComponent> {
  get titleText() {
    return this.selectByDataAttribute('title').textContent?.trim();
  }

  get galleriesText() {
    return this.selectByDataAttribute('galleries').textContent?.trim();
  }

  get imageElement() {
    return this.selectByDataAttribute('image') as HTMLImageElement;
  }
}
