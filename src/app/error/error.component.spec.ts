import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { It, Mock, Times } from 'typemoq';

import { TitleService } from '../shared/title.service';
import { PageHeroComponent } from '../shared/page-hero/page-hero.component';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));
  mockTitleService.setup(x => x.resetTitle());

  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(() => {
    mockTitleService.reset();

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        PageHeroComponent,
        ErrorComponent
      ],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show 404 text', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.basic-card > h2').textContent)
      .toContain('Feeling lost? Don’t worry');
  });

  it('should reset title', () => {
    mockTitleService.verify(s => s.resetTitle(), Times.once());
  });
});
