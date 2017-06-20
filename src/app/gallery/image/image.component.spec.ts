import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageService } from '../image.service';
import { MockImageService } from '../mocks/mock-image.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { MockTextParsingService } from '../../shared/mocks/mock-text-parsing.service';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  const mockImageService = new MockImageService();
  const mockTextParsingService = new MockTextParsingService();

  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ImageComponent ],
      providers: [
        {provide: ImageService, useValue: mockImageService},
        {provide: TextParsingService, useValue: mockTextParsingService}
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
      expect(compiled.querySelector('.controls .button').textContent.trim())
        .toBe('Back to album name');
    });
  }));

  it('should display image title', async(() => {
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('.container h1').textContent.trim())
        .toBe('img_title');
    });
  }));

  it('should display image date (locale dependent)', async(() => {
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('.date-area').textContent.trim())
        .toBe('Nov 29, 1973, 9:33:09 PM');
    });
  }));

  it('should display tag list', async(() => {
    component.data = mockImageService.testHelperMethodGetMockData();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const tagListElements = compiled.querySelectorAll('.tag-list li');
      expect(tagListElements.length).toBe(3); // Add one for the icon element
      expect(tagListElements[1].textContent.trim()).toBe('album name');
      expect(tagListElements[2].textContent.trim()).toBe('album name 2');
    });
  }));
});
