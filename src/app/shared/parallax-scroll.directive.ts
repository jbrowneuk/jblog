import { Directive, ElementRef } from '@angular/core';
import { ScrollDirectiveBase } from './scroll-directive.base';

import { TransitionCompleteService } from './transition-complete.service';

@Directive({ selector: '[jblogParallaxBackground]' })
export class ParallaxScrollDirective extends ScrollDirectiveBase {
  private imageElement: HTMLImageElement;
  private isLoadingImage: boolean;

  /**
   * Constructs an instance of this directive.
   */
  constructor(relatedElement: ElementRef, transitionService: TransitionCompleteService) {
    super(relatedElement, transitionService);
    this.isLoadingImage = false;
  }

  /**
   * Handles updating of the directive when scrolled.
   */
  protected handleUpdate(): void {
    if (!this.imageElement) {
      const children = Array.from(this.relatedElement.children);
      this.imageElement = children.find(c => c.tagName.toLowerCase() === 'img') as HTMLImageElement;

      // If the image hasn't loaded yet
      if (!this.imageElement.complete) {
        if (!this.isLoadingImage) {
          this.isLoadingImage = true;
          this.imageElement.addEventListener('load', this.onImageLoaded.bind(this));
        }

        return;
      }

      if (!this.imageElement) {
        return;
      }
    }

    if (!this.isOnScreen) {
      return;
    }

    this.recalculateParallax();
  }

  private onImageLoaded(): void {
    this.imageElement.removeEventListener('load', this.onImageLoaded);
    this.isLoadingImage = false;
    this.recalculateParallax();
  }

  private recalculateParallax(): void {
    const containerHeight = this.relatedElementBounds.height;
    const imageHeight = this.imageElement.getBoundingClientRect().height;

    // Don't waste processor time if the image is the same height or smaller
    // than the container element
    if (imageHeight <= containerHeight) {
      this.imageElement.style.opacity = '1';
      return;
    }

    // Parallax calculation adapted from the Materialize CSS parallax plugin,
    // https://github.com/Dogfalo/materialize/blob/v1-dev/js/parallax.js
    // licensed under MIT.
    const parallaxDist = imageHeight - containerHeight;

    const windowBottom = this.yPosition + this.viewportHeight;

    const percentScrolled = (windowBottom - this.relatedElementBounds.top) / (containerHeight + this.viewportHeight);
    const parallaxPosition = parallaxDist * percentScrolled;

    this.imageElement.style.transform = `translate3D(-50%, ${parallaxPosition}px, 0)`;
    this.imageElement.style.opacity = '1';
  }
}
