import { ComponentFixture } from '@angular/core/testing';

export function getElement(
  // tslint:disable-next-line: no-any
  fixture: ComponentFixture<any>,
  selector: string
): HTMLElement {
  const el: HTMLElement = fixture.debugElement.nativeElement;
  return el.querySelector<HTMLElement>(selector)!;
}

export function getElements(
  // tslint:disable-next-line: no-any
  fixture: ComponentFixture<any>,
  selector: string
): NodeListOf<HTMLElement> {
  const el: HTMLElement = fixture.debugElement.nativeElement;
  return el.querySelectorAll(selector);
}

export function getGlobalElement(selector: string): HTMLElement {
  return document.querySelector<HTMLElement>(selector)!;
}

export function getGlobalElements(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}
