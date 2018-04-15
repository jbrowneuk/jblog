import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Params, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { It, Mock, Times } from 'typemoq';

import { ImageService } from '../image.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { TitleService } from '../../shared/title.service';

import { MOCK_IMAGEDATA } from '../mocks/mock-data';

import { ImageComponent } from './image.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const PARSED_SUFFIX = ' was parsed';

describe('ImageComponent', () => {
  const mockImageService = Mock.ofType<ImageService>();
  const mockTextParsingService = Mock.ofType<TextParsingService>();

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

    mockTextParsingService.reset();
    mockTextParsingService.setup(s => s.parse(It.isAnyString())).returns((s: string) => `${s}${PARSED_SUFFIX}`);
  }

  function moduleSetup() {
    const providers: any[] = [
      { provide: ImageService, useFactory: () => mockImageService.object },
      { provide: TextParsingService, useFactory: () => mockTextParsingService.object },
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
      const expectedParsedOutput = `${MOCK_IMAGEDATA.description}${PARSED_SUFFIX}`;

      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        mockTextParsingService.verify(x => x.parse(It.isValue(MOCK_IMAGEDATA.description)), Times.atLeastOnce());
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

    it('should toggle zoom', () => {
      const originalZoomedOut = component.isZoomedOut;

      const mockEvent = Mock.ofType<Event>();
      mockEvent.setup(e => e.preventDefault());

      component.toggleZoom(mockEvent.object);

      expect(component.isZoomedOut).not.toBe(originalZoomedOut);
    });

    it('should request image on load', async(() => {
      const mockParam: Params = { id: '1' };
      const route = TestBed.get(ActivatedRoute) as ActivatedRoute;
      const params = route.params as BehaviorSubject<Params>;
      params.next(mockParam);

      component.ngOnInit();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(component.data).toEqual(MOCK_IMAGEDATA);
      });
    }));
  });
});
