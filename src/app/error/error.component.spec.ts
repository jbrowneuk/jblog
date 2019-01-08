import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { It, Mock, Times } from 'typemoq';

import { TitleService } from '../shared/title.service';

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
      imports: [RouterTestingModule],
      declarations: [ErrorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show 404 text', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content-area > h1').textContent).toContain(
      'Feeling lost? Don’t worry'
    );
  });

  it('should reset title', () => {
    mockTitleService.verify(s => s.resetTitle(), Times.once());
    expect().nothing();
  });
});
