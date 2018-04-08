import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { It, Mock } from 'typemoq';

import { TitleService } from '../../shared/title.service';
import { MockTitleService } from '../../shared/mocks/mock-title.service';
import { FeatureToggleService } from '../../shared/feature-toggle.service';

import { TopPageComponent } from './top-page.component';

describe('TopPageComponent', () => {
  const mockTitleService = new MockTitleService();

  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;
  let compiled: HTMLElement;

  const mockFeatureToggleService = Mock.ofType<FeatureToggleService>();
  mockFeatureToggleService.setup(m => m.isEnabled(It.isAnyString())).returns(() => false);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        TopPageComponent
      ],
      providers: [
        { provide: TitleService, useValue: mockTitleService },
        { provide: FeatureToggleService, useFactory: () => mockFeatureToggleService.object }
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
  });
});
