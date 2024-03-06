import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksComponent } from './artworks.component';

describe('Artworks section', () => {
  let fixture: ComponentFixture<ArtworksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ArtworksComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworksComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
