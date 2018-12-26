import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

const cssUnit = 'px';
const speed = .5;

@Directive({ selector: '[jblogParallaxBackground]' })
export class ParallaxScrollDirective implements OnInit, OnDestroy {
  private parallaxElement: HTMLElement;
  private offset = 0;

  constructor(element: ElementRef) {
    this.parallaxElement = element.nativeElement;
  }

  public ngOnInit() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  public ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll(): void {
    const scrollPosition = window.scrollY * speed + this.offset;
    const css = `center calc(50% ${scrollPosition}${cssUnit})`;
    this.parallaxElement.style['backgroundPosition'] = css;
  }
}
