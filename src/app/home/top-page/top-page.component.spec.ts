import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageService } from '../../gallery/image.service';
import { MockImageService } from '../../gallery/mocks/mock-image.service';
import { GalleryFormatPipe } from '../../gallery/gallery-format.pipe';
import { ThumbnailComponent } from '../../gallery/thumbnail/thumbnail.component';
import { ImageContainerComponent } from '../../gallery/image-container/image-container.component';

import { TopPageComponent } from './top-page.component';

describe('TopPageComponent', () => {
  const mockImageService = new MockImageService();

  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        GalleryFormatPipe,
        ThumbnailComponent,
        ImageContainerComponent,
        TopPageComponent
      ],
      providers: [
        { provide: ImageService, useValue: mockImageService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create and load images', () => {
    expect(component).toBeTruthy();
    const thumbnails = compiled.querySelectorAll('jblog-thumbnail');
    expect(thumbnails.length).toBe(1);
  });
});
