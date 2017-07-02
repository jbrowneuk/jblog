import { SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should paginate without spacing for less than 4 pages', () => {
    component.currentPage = 1;
    component.totalPages = 4;
    component.ngOnChanges({currentPage: new SimpleChange(0, 6, true)});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const bits = compiled.querySelectorAll('ul li');

      expect(bits.length).toBe(6);
      expect(bits[0].classList).toContain('directional-indicator');
      expect(bits[1].textContent.trim()).toBe('1');
      expect(bits[2].textContent.trim()).toBe('2');
      expect(bits[3].textContent.trim()).toBe('3');
      expect(bits[4].textContent.trim()).toBe('4');
      expect(bits[5].classList).toContain('directional-indicator');
    });
  });

  it('should paginate with spacing for greater than 4 pages', () => {
    component.currentPage = 1;
    component.totalPages = 5;
    component.ngOnChanges({currentPage: new SimpleChange(0, 6, true)});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const bits = compiled.querySelectorAll('ul li');

      expect(bits.length).toBe(7);
      expect(bits[0].classList).toContain('directional-indicator');
      expect(bits[1].textContent.trim()).toBe('1');
      expect(bits[2].textContent.trim()).toBe('2');
      expect(bits[3].textContent.trim()).toBe('3');
      expect(bits[4].textContent.trim()).toBe('…');
      expect(bits[5].textContent.trim()).toBe('5');
      expect(bits[6].classList).toContain('directional-indicator');
    });
  });

  it('should paginate with spacing if required', () => {
    component.currentPage = 10;
    component.totalPages = 20;
    component.ngOnChanges({currentPage: new SimpleChange(0, 6, true)});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const bits = compiled.querySelectorAll('ul li');

      expect(bits.length).toBe(11);
      expect(bits[0].classList).toContain('directional-indicator');
      expect(bits[1].textContent.trim()).toBe('1');
      expect(bits[2].textContent.trim()).toBe('…');
      expect(bits[3].textContent.trim()).toBe('8');
      expect(bits[4].textContent.trim()).toBe('9');
      expect(bits[5].textContent.trim()).toBe('10');
      expect(bits[6].textContent.trim()).toBe('11');
      expect(bits[7].textContent.trim()).toBe('12');
      expect(bits[8].textContent.trim()).toBe('…');
      expect(bits[9].textContent.trim()).toBe('20');
      expect(bits[10].classList).toContain('directional-indicator');
    });
  });

  it('should add left spacing if required', () => {

    const updatePageNumberAndGetBits = (num: number): NodeListOf<Element> => {
      component.currentPage = num;
      component.ngOnChanges({currentPage: new SimpleChange(0, num, true)});
      fixture.detectChanges();
      return compiled.querySelectorAll('ul li');
    };

    component.totalPages = 20;

    // 1st page
    let bits = updatePageNumberAndGetBits(1);
    expect(bits[1].textContent.trim()).toBe('1');
    expect(bits[2].textContent.trim()).toBe('2');
    expect(bits[3].textContent.trim()).toBe('3');

    // 2nd page
    bits = updatePageNumberAndGetBits(2);
    expect(bits[1].textContent.trim()).toBe('1');
    expect(bits[2].textContent.trim()).toBe('2');
    expect(bits[3].textContent.trim()).toBe('3');
    expect(bits[4].textContent.trim()).toBe('4');

    // 3rd page
    bits = updatePageNumberAndGetBits(3);
    expect(bits[1].textContent.trim()).toBe('1');
    expect(bits[2].textContent.trim()).toBe('2');
    expect(bits[3].textContent.trim()).toBe('3');
    expect(bits[4].textContent.trim()).toBe('4');
    expect(bits[5].textContent.trim()).toBe('5');

    // 4th page
    bits = updatePageNumberAndGetBits(4);
    expect(bits[1].textContent.trim()).toBe('1');
    expect(bits[2].textContent.trim()).toBe('2');
    expect(bits[3].textContent.trim()).toBe('3');
    expect(bits[4].textContent.trim()).toBe('4');
    expect(bits[5].textContent.trim()).toBe('5');
    expect(bits[6].textContent.trim()).toBe('6');

    // 5th page
    bits = updatePageNumberAndGetBits(5);
    expect(bits[1].textContent.trim()).toBe('1');
    expect(bits[2].textContent.trim()).toBe('…');
    expect(bits[3].textContent.trim()).toBe('3');
    expect(bits[4].textContent.trim()).toBe('4');
    expect(bits[5].textContent.trim()).toBe('5');
    expect(bits[6].textContent.trim()).toBe('6');
    expect(bits[7].textContent.trim()).toBe('7');

    // 6th page
    bits = updatePageNumberAndGetBits(6);
    expect(bits[1].textContent.trim()).toBe('1');
    expect(bits[2].textContent.trim()).toBe('…');
    expect(bits[3].textContent.trim()).toBe('4');
    expect(bits[4].textContent.trim()).toBe('5');
    expect(bits[5].textContent.trim()).toBe('6');
    expect(bits[6].textContent.trim()).toBe('7');
    expect(bits[7].textContent.trim()).toBe('8');
  });

  it('should add right spacing if required', () => {

    const updatePageNumberAndGetBits = (num: number): NodeListOf<Element> => {
      component.currentPage = num;
      component.ngOnChanges({currentPage: new SimpleChange(0, num, true)});
      fixture.detectChanges();
      return compiled.querySelectorAll('ul li');
    };

    component.totalPages = 20;

    // Nth page
    let bits = updatePageNumberAndGetBits(20);
    expect(bits[3].textContent.trim()).toBe('18');
    expect(bits[4].textContent.trim()).toBe('19');
    expect(bits[5].textContent.trim()).toBe('20');

    // Nth - 1 page
    bits = updatePageNumberAndGetBits(19);
    expect(bits[3].textContent.trim()).toBe('17');
    expect(bits[4].textContent.trim()).toBe('18');
    expect(bits[5].textContent.trim()).toBe('19');
    expect(bits[6].textContent.trim()).toBe('20');

    // Nth - 2 page
    bits = updatePageNumberAndGetBits(18);
    expect(bits[3].textContent.trim()).toBe('16');
    expect(bits[4].textContent.trim()).toBe('17');
    expect(bits[5].textContent.trim()).toBe('18');
    expect(bits[6].textContent.trim()).toBe('19');
    expect(bits[7].textContent.trim()).toBe('20');

    // Nth - 3 page
    bits = updatePageNumberAndGetBits(17);
    expect(bits[3].textContent.trim()).toBe('15');
    expect(bits[4].textContent.trim()).toBe('16');
    expect(bits[5].textContent.trim()).toBe('17');
    expect(bits[6].textContent.trim()).toBe('18');
    expect(bits[7].textContent.trim()).toBe('19');
    expect(bits[8].textContent.trim()).toBe('20');

    // Nth - 3 page
    bits = updatePageNumberAndGetBits(16);
    expect(bits[4].textContent.trim()).toBe('15');
    expect(bits[5].textContent.trim()).toBe('16');
    expect(bits[6].textContent.trim()).toBe('17');
    expect(bits[7].textContent.trim()).toBe('18');
    expect(bits[8].textContent.trim()).toBe('…');
    expect(bits[9].textContent.trim()).toBe('20');
  });
});
