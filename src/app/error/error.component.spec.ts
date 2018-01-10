import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TitleService } from '../shared/title.service';
import { MockTitleService } from '../shared/mocks/mock-title.service';

import { PageHeroComponent } from '../shared/page-hero/page-hero.component';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  const mockTitleService = new MockTitleService();
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        PageHeroComponent,
        ErrorComponent
      ],
      providers: [
        { provide: TitleService, useValue: mockTitleService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show 404 text', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.basic-card > h2').textContent)
      .toContain('You’re looking a little lost there.');
  });

  it('should reset title', () => {
    expect(mockTitleService.mockTitle).toBe('');
  });
});
