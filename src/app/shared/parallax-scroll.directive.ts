import { Directive, ElementRef } from '@angular/core';
import { ScrollDirectiveBase } from './scroll-directive.base';

@Directive({ selector: '[jblogParallaxBackground]' })
export class ParallaxScrollDirective extends ScrollDirectiveBase {
  private imageElement: HTMLElement;

  constructor(private relatedElement: ElementRef) {
    super(relatedElement);
  }

  protected handleUpdate(): void {
    const element = this.relatedElement.nativeElement as HTMLElement;
    let isFirstRun = false;
    if (!this.imageElement) {
      const children = Array.from(element.children);
      this.imageElement = children.find(c => c.tagName.toLowerCase() === 'img') as HTMLElement;

      if (!this.imageElement) {
        return;
      }

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
    const windowBottom = this.yPosition + windowHeight;

    const percentScrolled = (windowBottom - element.getBoundingClientRect().top) / (containerHeight + windowHeight);
    const parallax = parallaxDist * percentScrolled;

    if (isFirstRun ||
      (bottom > this.yPosition && top < this.yPosition + windowHeight)) {
      this.imageElement.style.transform = `translate3D(-50%, ${parallax}px, 0)`;
      this.imageElement.style.opacity = '1';
    }
  }
}
