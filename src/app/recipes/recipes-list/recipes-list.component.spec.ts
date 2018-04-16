import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { It, IMock, Mock, Times } from 'typemoq';

import { RecipesService } from '../recipes.service';
import { TitleService } from '../../shared/title.service';

import { RecipesListComponent } from './recipes-list.component';

describe('RecipesListComponent', () => {
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));

  let mockRecipeService: IMock<RecipesService>;
  let component: RecipesListComponent;
  let fixture: ComponentFixture<RecipesListComponent>;

  beforeEach(() => {
    mockTitleService.reset();
    mockRecipeService = Mock.ofType<RecipesService>();

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ RecipesListComponent ],
      providers: [
        { provide: RecipesService, useFactory: () => mockRecipeService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
