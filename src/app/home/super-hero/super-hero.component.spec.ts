import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroComponent } from './super-hero.component';

describe('Artworks section', () => {
  let fixture: ComponentFixture<SuperHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SuperHeroComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
