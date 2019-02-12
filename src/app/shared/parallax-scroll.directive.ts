import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

const cssUnit = 'px';

@Directive({ selector: '[jblogParallaxBackground]' })
export class ParallaxScrollDirective implements OnInit, OnDestroy {
  @Input() public speed = 0.5;
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
    const scrollPosition = window.scrollY * this.speed + this.offset;
    const css = `center calc(50% - ${scrollPosition}${cssUnit})`;
    this.parallaxElement.style['backgroundPosition'] = css;
  }
}
