import { BehaviorSubject, of as observableOf } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMock, It, Mock } from 'typemoq';

import { formatDate } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NO_ERRORS_SCHEMA, Pipe, PipeTransform
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageService } from '../../services/image.service';
import { TitleService } from '../../shared/title.service';
import { MOCK_IMAGEDATA } from '../mocks/mock-data';
import { ImageComponent } from './image.component';

class ImageComponentPageObject extends PageObjectBase<ImageComponent> {
  public get imageDescription(): string {
    const element = this.select('[data-post-content]');
    return element.textContent.trim();
  }

  public get parentFolderLinkText(): string {
    const element = this.select('[data-parent-folder-link');
    return element.textContent.trim();
  }

  public get imageTitleText(): string {
    return this.select('[data-title]').textContent.trim();
  }

  public get tags(): HTMLAnchorElement[] {
    return this.selectAll('[data-post-tag]');
  }

  public get dateContainer(): HTMLTimeElement {
    return this.select('[data-date]');
  }

  public get dateDay(): HTMLSpanElement {
    return this.select('[data-day]');
  }

  public get dateMonthYear(): HTMLSpanElement {
    return this.select('[data-month-year]');
  }
}

describe('Image Component', () => {
  let mockImageService: IMock<ImageService>;
  let mockTitleService: IMock<TitleService>;

  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let pageObject: ImageComponentPageObject;

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
  }

  function moduleSetup(): Promise<any> {
    const providers: any[] = [
      { provide: ImageService, useFactory: () => mockImageService.object },
      { provide: TitleService, useFactory: () => mockTitleService.object }
    ];

    return TestBed.configureTestingModule({
      declarations: [ImageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: providers
    }).compileComponents();
  }

  function componentSetup() {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    pageObject = new ImageComponentPageObject(fixture);
  }

  describe('Unloaded state', () => {
    beforeEach(async(async () => {
      resetMocks();
      await moduleSetup();
      componentSetup();
      fixture.detectChanges();
    }));

    it('should request image on load', async(async () => {
      const mockParam: Params = { id: '1' };
      const route = TestBed.inject(ActivatedRoute) as ActivatedRoute;
      const params = route.params as BehaviorSubject<Params>;
      params.next(mockParam);

      component.ngOnInit();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.data).toEqual(MOCK_IMAGEDATA);
    }));
  });

  describe('Loaded state', () => {
    beforeEach(async(async () => {
      resetMocks();
      await moduleSetup();
      componentSetup();
      component.data = MOCK_IMAGEDATA;
      fixture.detectChanges();
    }));

    it('should create and have zoomed out state', () => {
      expect(component).toBeTruthy();
      expect(component.isZoomedOut).toBeTruthy();
    });

    it('should parse description text', () => {
      expect(pageObject.imageDescription).toBe(MOCK_IMAGEDATA.description);
    });

    it('should display parent folder name', () => {
      expect(pageObject.parentFolderLinkText).toBe(
        `Back to ${MOCK_IMAGEDATA.containingAlbums[0].title}`
      );
    });

    it('should display image title', () => {
      expect(pageObject.imageTitleText).toBe(MOCK_IMAGEDATA.title);
    });

    it('should display date in correct formats', () => {
      // Convert date/time using test runner’s timeZone
      const currentLocale = TestBed.inject(LOCALE_ID);
      const epochMsec = MOCK_IMAGEDATA.date * 1000;
      const expectedAttrValue = formatDate(
        epochMsec,
        'yyyy-MM-ddTHH:mmZ',
        currentLocale
      );
      const expectedDayValue = formatDate(epochMsec, 'd', currentLocale);

      const expectedMonthYearValue = formatDate(
        epochMsec,
        'MMM yyyy',
        currentLocale
      );

      expect(pageObject.dateContainer.dateTime).toBe(expectedAttrValue);
      expect(pageObject.dateDay.textContent.trim()).toBe(expectedDayValue);
      expect(pageObject.dateMonthYear.textContent.trim()).toBe(
        expectedMonthYearValue
      );
    });

    it('should display tag list', () => {
      const tagListElements = pageObject.tags;
      expect(tagListElements.length).toBe(2);
      expect(tagListElements[0].textContent.trim()).toBe(
        MOCK_IMAGEDATA.containingAlbums[0].title
      );
      expect(tagListElements[1].textContent.trim()).toBe(
        MOCK_IMAGEDATA.containingAlbums[1].title
      );
    });

    it('should toggle zoom', () => {
      const originalZoomedOut = component.isZoomedOut;

      const mockEvent = Mock.ofType<Event>();
      mockEvent.setup(e => e.preventDefault());

      component.toggleZoom(mockEvent.object);

      expect(component.isZoomedOut).not.toBe(originalZoomedOut);
    });
  });
});
