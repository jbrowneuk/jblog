import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesComponent } from './licenses.component';

describe('LicensesComponent', () => {
  let fixture: ComponentFixture<LicensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicensesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesComponent);
    fixture.detectChanges();
  });

  it('should have an element with third-party credits', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#foss-credits h1').textContent).toContain(
      'Credits and Open Source libraries'
    );
  });
});
