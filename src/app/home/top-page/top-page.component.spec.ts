import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { It, Mock } from 'typemoq';

import { TitleService } from '../../shared/title.service';
import { FeatureToggleService } from '../../shared/feature-toggle.service';

import { TopPageComponent } from './top-page.component';

describe('TopPageComponent', () => {
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));
  mockTitleService.setup(x => x.resetTitle());

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
        { provide: TitleService, useFactory: () => mockTitleService.object },
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
