import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { It, Mock, Times } from 'typemoq';

import { ImageService } from '../image.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { TitleService } from '../../shared/title.service';

import { MOCK_IMAGEDATA } from '../mocks/mock-data';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  const mockImageService = Mock.ofType<ImageService>();
  const mockTextParsingService = new TextParsingService();

  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let compiled: HTMLElement;

  function resetMocks() {
    mockTitleService.reset();

    mockImageService.reset();
    mockImageService.setup(s => s.getImageInfo(It.isAnyNumber()))
      .returns(() => Observable.of(MOCK_IMAGEDATA));
    mockImageService.setup(s => s.getImagesFromAlbum(It.isAnyString(), It.isAnyNumber(), It.isAnyNumber()))
      .returns(() => Observable.of([MOCK_IMAGEDATA]));
  }

  function moduleSetup() {
    const providers: any[] = [
      { provide: ImageService, useFactory: () => mockImageService.object },
      { provide: TextParsingService, useValue: mockTextParsingService },
      { provide: TitleService, useFactory: () => mockTitleService.object }
    ];

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ImageComponent ],
      providers: providers
    })
    .compileComponents();
  }

  function componentSetup() {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }

  describe('main interaction', () => {

    beforeEach(() => {
      resetMocks();
      moduleSetup();
      componentSetup();
    });

    it('should create and have zoomed out state', () => {
      expect(component.isZoomedOut).toBeTruthy();

      // No image data, should show loading text
      expect(compiled.querySelector('.panel').textContent.trim()).toBe('Loading…');
    });

    it('should parse description text', async(() => {
      const expectedParsedOutput = `${MOCK_IMAGEDATA.description} was parsed`;
      spyOn(mockTextParsingService, 'parse').and.returnValue(expectedParsedOutput);

      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(mockTextParsingService.parse).toHaveBeenCalled();
        expect(compiled.querySelector('.content-area').textContent).toBe(expectedParsedOutput);
      });
    }));

    it('should display parent folder name', async(() => {
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(compiled.querySelector('#parent-folder-link').textContent.trim())
          .toBe(`Back to ${MOCK_IMAGEDATA.containingAlbums[0].title}`);
      });
    }));

    it('should display image title', async(() => {
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(compiled.querySelector('#image-title').textContent.trim())
          .toBe(MOCK_IMAGEDATA.title);
      });
    }));

    it('should display image date (locale dependent)', async(() => {
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(compiled.querySelector('.card-info').textContent.trim())
          .toBe('Nov 29, 1973, 9:33:09 PM');
      });
    }));

    it('should display tag list', async(() => {
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const tagListElements = compiled.querySelectorAll('#gallery-area a');
        expect(tagListElements.length).toBe(2);
        expect(tagListElements[0].textContent.trim()).toBe(MOCK_IMAGEDATA.containingAlbums[0].title);
        expect(tagListElements[1].textContent.trim()).toBe(MOCK_IMAGEDATA.containingAlbums[1].title);
      });
    }));
  });
});
