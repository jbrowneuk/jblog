import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({ selector: '[jblogParallaxBackground]'})
export class ParallaxScrollDirective implements OnInit {
  private lastKnownScrollPosition;
  private isTicking;
  private imageElement: HTMLElement;

  constructor(private relatedElement: ElementRef) {
    this.lastKnownScrollPosition = -1;
    this.isTicking = false;
  }

  ngOnInit() {
    setTimeout(() => {
      this.lastKnownScrollPosition = window.scrollY;
      this.handleUpdate();
    }, 16);
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(evt: Event) {
    this.lastKnownScrollPosition = window.scrollY;
    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        this.handleUpdate();
        this.isTicking = false;
      });
    }

    this.isTicking = true;
  }

  private handleUpdate(): void {
    const element = this.relatedElement.nativeElement as HTMLElement;
    let isFirstRun = false;
    if (!this.imageElement) {
      const children = Array.from(element.children);
      this.imageElement = children.find(c => c.tagName.toLowerCase() === 'img') as HTMLElement;

      if (!this.imageElement) {
        return;
      }

      this.imageElement.style.opacity = '1';
      this.lastKnownScrollPosition = window.scrollY;
      isFirstRun = true;
    }

    // Adapted from the Materialize CSS parallax plugin,
    // https://github.com/Dogfalo/materialize/blob/v1-dev/js/parallax.js
    // licensed under MIT.
    const containerHeight = element.getBoundingClientRect().height;
    const imageHeight = this.imageElement.offsetHeight;

    const parallaxDist = imageHeight - containerHeight;

    const top = element.offsetTop;
    const bottom = top + containerHeight;

    const windowHeight = window.innerHeight;
    const windowBottom = this.lastKnownScrollPosition + windowHeight;

    const percentScrolled = (windowBottom - element.getBoundingClientRect().top) / (containerHeight + windowHeight);
    const parallax = parallaxDist * percentScrolled;

    if (isFirstRun ||
      (bottom > this.lastKnownScrollPosition && top < this.lastKnownScrollPosition + windowHeight)) {
      this.imageElement.style.transform = `translate3D(-50%, ${parallax}px, 0)`;
    }
  }
}
