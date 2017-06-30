import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GalleryFormatPipe } from '../gallery-format.pipe';

import { ThumbnailComponent } from './thumbnail.component';

const mockImageInfo = {
  id: 1,
  title: 'title',
  date: Date.now(),
  description: 'description',
  thumbnail: './thumb.jpg',
  src: './src.jpg',
  containingAlbums: [{name: 'album', title: 'Album'}],
  featured: false
};

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        GalleryFormatPipe,
        ThumbnailComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    component.data = mockImageInfo;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render elements correctly', () => {
    expect(component).toBeTruthy();
    expect(compiled.querySelector('.image-area img').src).toBe('./src.jpg');
    expect(compiled.querySelector('.text-area .title').textContent.trim()).toBe('title');
    expect(compiled.querySelector('.text-area .galleries').textContent.trim()).toBe('Album');
  });
});
