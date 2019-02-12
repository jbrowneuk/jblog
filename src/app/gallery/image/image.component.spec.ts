import { of as observableOf, BehaviorSubject } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Params, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { It, IMock, Mock, Times } from 'typemoq';

import { ImageService } from '../image.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { TitleService } from '../../shared/title.service';

import { MOCK_IMAGEDATA } from '../mocks/mock-data';

import { ImageComponent } from './image.component';

const PARSED_SUFFIX = ' was parsed';

@Pipe({
  name: 'date',
  pure: false
})
class MockDatePipe implements PipeTransform {
  transform(value: any): string {
    return `${value}`;
  }
}

describe('ImageComponent', () => {
  let mockImageService: IMock<ImageService>;
  let mockTextParsingService: IMock<TextParsingService>;
  let mockTitleService: IMock<TitleService>;

  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let compiled: HTMLElement;

  function resetMocks() {
    mockTitleService = Mock.ofType<TitleService>();
    mockTitleService.setup(x => x.setTitle(It.isAnyString()));

    mockImageService = Mock.ofType<ImageService>();
    mockImageService
      .setup(s => s.getImageInfo(It.isAnyNumber()))
      .returns(() => observableOf(MOCK_IMAGEDATA));
    mockImageService
      .setup(s =>
        s.getImagesFromAlbum(
          It.isAnyString(),
          It.isAnyNumber(),
          It.isAnyNumber()
        )
      )
      .returns(() => observableOf([MOCK_IMAGEDATA]));

    mockTextParsingService = Mock.ofType<TextParsingService>();
    mockTextParsingService
      .setup(s => s.parse(It.isAnyString()))
      .returns((s: string) => `${s}${PARSED_SUFFIX}`);
  }

  function moduleSetup(): Promise<any> {
    const providers: any[] = [
      { provide: ImageService, useFactory: () => mockImageService.object },
      {
        provide: TextParsingService,
        useFactory: () => mockTextParsingService.object
      },
      { provide: TitleService, useFactory: () => mockTitleService.object }
    ];

    return TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MockDatePipe, ImageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: providers
    }).compileComponents();
  }

  function componentSetup() {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }

  describe('main interaction', () => {
    beforeEach(async(async () => {
      resetMocks();
      await moduleSetup();
      componentSetup();
    }));

    it('should create and have zoomed out state', () => {
      expect(component).toBeTruthy();
      expect(component.isZoomedOut).toBeTruthy();
    });

    it('should parse description text', async(async () => {
      const expectedParsedOutput = `${
        MOCK_IMAGEDATA.description
      }${PARSED_SUFFIX}`;

      component.data = MOCK_IMAGEDATA;

      fixture.detectChanges();
      await fixture.whenStable();

      mockTextParsingService.verify(
        x => x.parse(It.isValue(MOCK_IMAGEDATA.description)),
        Times.atLeastOnce()
      );
      expect(compiled.querySelector('.content-area').textContent).toBe(
        expectedParsedOutput
      );
    }));

    it('should display parent folder name', async(async () => {
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(
        compiled.querySelector('#parent-folder-link').textContent.trim()
      ).toBe(`Back to ${MOCK_IMAGEDATA.containingAlbums[0].title}`);
    }));

    it('should display image title', async(async () => {
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(compiled.querySelector('#image-title').textContent.trim()).toBe(
        MOCK_IMAGEDATA.title
      );
    }));

    it('should display image date', async(async () => {
      component.data = MOCK_IMAGEDATA;
      const expectedDate = '' + MOCK_IMAGEDATA.date * 1000;

      fixture.detectChanges();
      await fixture.whenStable();

      // Uses the mock date pipe
      expect(compiled.querySelector('.date').textContent.trim()).toBe(
        expectedDate
      );
    }));

    it('should display tag list', async(async () => {
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
      await fixture.whenStable();

      const tagListElements = compiled.querySelectorAll('#gallery-area a');
      expect(tagListElements.length).toBe(2);
      expect(tagListElements[0].textContent.trim()).toBe(
        MOCK_IMAGEDATA.containingAlbums[0].title
      );
      expect(tagListElements[1].textContent.trim()).toBe(
        MOCK_IMAGEDATA.containingAlbums[1].title
      );
    }));

    it('should toggle zoom', () => {
      const originalZoomedOut = component.isZoomedOut;

      const mockEvent = Mock.ofType<Event>();
      mockEvent.setup(e => e.preventDefault());

      component.toggleZoom(mockEvent.object);

      expect(component.isZoomedOut).not.toBe(originalZoomedOut);
    });

    it('should request image on load', async(async () => {
      const mockParam: Params = { id: '1' };
      const route = TestBed.get(ActivatedRoute) as ActivatedRoute;
      const params = route.params as BehaviorSubject<Params>;
      params.next(mockParam);

      component.ngOnInit();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.data).toEqual(MOCK_IMAGEDATA);
    }));
  });
});
