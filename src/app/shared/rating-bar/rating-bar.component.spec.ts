import { PageObjectBase } from 'src/app/lib/testing/page-object.base';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingBarComponent } from './rating-bar.component';

describe('Rating Bar Component', () => {
  let component: RatingBarComponent;
  let fixture: ComponentFixture<RatingBarComponent>;
  let pageObject: RatingBarPageObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingBarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingBarComponent);
    pageObject = new RatingBarPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct number of dots', () => {
    const expectedDots = 5;
    component.amount = expectedDots;
    fixture.detectChanges();
    expect(pageObject.totalDotCount).toBe(expectedDots);
  });

  it('should have correct number of filled dots', () => {
    const expectedDots = 5;
    component.value = expectedDots;
    fixture.detectChanges();
    expect(pageObject.filledDotCount).toBe(expectedDots);
    expect(pageObject.unfilledDotCount).toBe(component.amount - expectedDots);
  });

  it('should have no dots if amount is zero', () => {
    component.amount = 0;
    fixture.detectChanges();
    expect(pageObject.totalDotCount).toBe(0);
  });

  it('should have only filled dots if value greater than amount', () => {
    const amount = 10;
    component.amount = amount;
    component.value = amount + 2;
    fixture.detectChanges();
    expect(pageObject.totalDotCount).toBe(amount);
    expect(pageObject.filledDotCount).toBe(amount);
  });
});

class RatingBarPageObject extends PageObjectBase<RatingBarComponent> {
  public get totalDotCount(): number {
    const dots = this.selectAll('[data-dot]');
    return dots.length;
  }

  public get filledDotCount(): number {
    const dots = this.selectAll('[data-dot].filled');
    return dots.length;
  }

  public get unfilledDotCount(): number {
    const dots = this.selectAll('[data-dot]:not(.filled)');
    return dots.length;
  }
}
