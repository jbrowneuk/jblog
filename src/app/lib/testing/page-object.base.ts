import { ComponentFixture } from '@angular/core/testing';

export abstract class PageObjectBase<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  private get nativeElement(): HTMLElement {
    return this.fixture.nativeElement;
  }

  protected select<E extends Element = Element>(selector: string): E {
    return this.nativeElement.querySelector(selector);
  }

  protected selectAll<E extends Element = Element>(selector: string): E[] {
    return Array.from(this.nativeElement.querySelectorAll(selector));
  }
}
