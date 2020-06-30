import { Component, Input, Output, EventEmitter, HostBinding, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'mh-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements AfterViewInit {
  @ViewChild('checkbox') checkboxElement!: ElementRef<HTMLInputElement>;
  @ViewChild('label') labelElement!: ElementRef<HTMLElement>;
  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  showDeleteButton = false;

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = coerceBooleanProperty(checked);
  }
  private _checked = false;

  @Input() value = '';

  @Output() checkChange = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<string>();
  @Output() remove = new EventEmitter<void>();

  constructor(private focusMonitor: FocusMonitor) {}

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.labelElement, true).subscribe((origin) => {
      if (origin === 'keyboard' || origin === 'program') {
        this.checkboxElement.nativeElement.focus();
      }
    });
  }

  toggle(): void {
    this.checked = !this.checked;
  }

  onInputChange(event: Event): void {
    event.stopPropagation();
    this.toggle();
    this.checkChange.emit(this.checked);
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.onInputBlur();
    }
  }

  onInputFocus(): void {
    this.showDeleteButton = true;
  }

  onInputBlur(): void {
    this.showDeleteButton = false;
    const inputValue = this.inputElement.nativeElement.value;
    if (this.value !== inputValue) {
      this.value = inputValue;
      this.valueChange.emit(this.value);
    }
  }
}
