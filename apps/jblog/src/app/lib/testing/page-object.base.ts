import { DebugElement, Predicate } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export abstract class PageObjectBase<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  private get nativeElement(): HTMLElement {
    return this.fixture.nativeElement;
  }

  private get debugElement(): DebugElement {
    return this.fixture.debugElement;
  }

  protected select<E extends Element = Element>(selector: string): E {
    return this.nativeElement.querySelector<E>(selector) as E;
  }

  protected selectAll<E extends Element = Element>(selector: string): E[] {
    return Array.from(this.nativeElement.querySelectorAll(selector));
  }

  protected selectDebug(selector: string): DebugElement {
    return this.debugElement.query(By.css(selector));
  }

  protected selectDebugByPredicate(
    predicate: Predicate<DebugElement>
  ): DebugElement {
    return this.debugElement.query(predicate);
  }

  public click(element: DebugElement | HTMLElement, event?: MouseEvent): void {
    if (element instanceof HTMLElement) {
      if (event) {
        throw new Error(
          'event argument is invalid for HTMLElement.click() method'
        );
      }

      element.click();
    } else {
      element.triggerEventHandler('click', event);
    }
  }

  public sendInput(inputElement: HTMLInputElement, value: string) {
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
  }
}
