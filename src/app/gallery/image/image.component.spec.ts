import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageService } from '../image.service';
import { MockImageService } from '../mocks/mock-image.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { MockTextParsingService } from '../../shared/mocks/mock-text-parsing.service';
import { TitleService } from '../../shared/title.service';
import { MockTitleService } from '../../shared/mocks/mock-title.service';

// import { ActivatedRouteStub } from '../../../testing/router.stubs';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  const mockImageService = new MockImageService();
  const mockTextParsingService = new MockTextParsingService();
  const mockTitleService = new MockTitleService();

  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    // cnst activatedRoute = new ActivatedRouteStub();
    // activatedRoute.testParamMap = { id: 1 };

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ImageComponent ],
      providers: [
        // { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ImageService, useValue: mockImageService },
        { provide: TextParsingService, useValue: mockTextParsingService },
        { provide: TitleService, useValue: mockTitleService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create and have zoomed out state', () => {
    expect(component.isZoomedOut).toBeTruthy();

    // No image data, should show loading text
    expect(compiled.querySelector('.panel').textContent.trim()).toBe('Loading…');
  });

  it('should parse description text', async(() => {
    spyOn(mockTextParsingService, 'parse').and.callThrough();
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockTextParsingService.parse).toHaveBeenCalled();
      expect(compiled.querySelector('.content-area').textContent).toBe('img_desc was parsed');
    });
  }));

  it('should display parent folder name', async(() => {
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('#parent-folder-link').textContent.trim())
        .toBe('Back to album name');
    });
  }));

  it('should display image title', async(() => {
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('#image-title').textContent.trim())
        .toBe('img_title');
    });
  }));

  it('should display image date (locale dependent)', async(() => {
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('.card-info').textContent.trim())
        .toBe('Nov 29, 1973, 9:33:09 PM');
    });
  }));

  it('should display tag list', async(() => {
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const tagListElements = compiled.querySelectorAll('#gallery-area a');
      expect(tagListElements.length).toBe(2); // Add one for the icon element
      expect(tagListElements[0].textContent.trim()).toBe('album name');
      expect(tagListElements[1].textContent.trim()).toBe('album name 2');
    });
  }));

  // Cannot get this to work currently; ActivatedRouteStub causes the tests to all fail
  xit('should set title', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockTitleService.mockTitle).toBe('title');
    });
  }));
});
