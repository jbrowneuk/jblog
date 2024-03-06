import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareComponent } from './software.component';

describe('Software section', () => {
  let fixture: ComponentFixture<SoftwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SoftwareComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
