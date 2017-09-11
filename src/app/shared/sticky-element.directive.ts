import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[jblogStickyElement]' })
export class StickyElementDirective {
  @Input() public scrollStartOffset = 64;
  @Input() public stickyClassName = 'scrolled';

  private lastKnownScrollPosition = 0;
  private isTicking = false;

  constructor(private relatedElement: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  public onScroll(evt: Event) {
    console.log('onscroll');
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
    const elementAddClass = window.pageYOffset > this.scrollStartOffset;
    const element = this.relatedElement.nativeElement;
    if (elementAddClass) {
      element.classList.add(this.stickyClassName);
    } else {
      element.classList.remove(this.stickyClassName);
    }
  }
}
