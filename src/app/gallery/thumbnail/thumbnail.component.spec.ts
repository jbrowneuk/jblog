import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';

import { GalleryFormatPipe } from '../gallery-format.pipe';

import { ThumbnailComponent } from './thumbnail.component';

const mockImageInfo = {
  id: 1,
  title: 'title',
  date: Date.now(),
  description: 'description',
  thumbnail: './thumb.jpg',
  src: './src.jpg',
  containingAlbums: [{ name: 'album', title: 'Album' }],
  featured: false,
};

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;
  let componentObject: ComponentObject;
  let compiled: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [GalleryFormatPipe, ThumbnailComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    componentObject = new ComponentObject(fixture);
    component = fixture.componentInstance;
    component.data = mockImageInfo;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render elements correctly', () => {
    expect(component).toBeTruthy();
    const imageElement = <HTMLImageElement>(
      compiled.querySelector('.image-area img')
    );
    expect(imageElement.src.endsWith('/thumb.jpg')).toBe(true);
    expect(`${componentObject.title.textContent}`.trim()).toBe('title');
    expect(`${componentObject.galleries.textContent}`.trim()).toBe('Album');
  });
});

class ComponentObject extends PageObjectBase<ThumbnailComponent> {
  get title() {
    return this.select('.text-area .title');
  }

  get galleries() {
    return this.select('.text-area .galleries');
  }
}
