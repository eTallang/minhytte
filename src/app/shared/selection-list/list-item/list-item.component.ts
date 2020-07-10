import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { DragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'mh-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, AfterViewInit {
  @ViewChild('checkbox') checkboxElement!: ElementRef<HTMLInputElement>;
  @ViewChild('label') labelElement!: ElementRef<HTMLElement>;
  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  hasFocus = false;
  oldValue = '';

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = coerceBooleanProperty(checked);
  }
  private _checked = false;

  @Input()
  get empty(): boolean {
    return this._empty;
  }
  set empty(empty: boolean) {
    this._empty = coerceBooleanProperty(empty);
  }
  private _empty = false;

  @Input() value = '';

  @Output() checkChange = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<string>();
  @Output() remove = new EventEmitter<void>();

  constructor(
    private focusMonitor: FocusMonitor,
    private dragDrop: DragDrop,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.oldValue = this.value;
  }

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.labelElement, true).subscribe((origin) => {
      if (origin === 'keyboard' || origin === 'program') {
        this.checkboxElement.nativeElement.focus();
      }
    });

    if (!this.empty) {
      this.createDrag();
    }
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

  onInputBlur(): void {
    if (this.value && this.value !== this.oldValue) {
      this.valueChange.emit(this.value);
      this.oldValue = this.value;
      if (this.empty) {
        this.value = '';
      }
    }
  }

  private createDrag() {
    const dragItem = this.dragDrop.createDrag(this.labelElement.nativeElement);
    dragItem.dropped.subscribe((e) => {
      if (e.distance.x < -50) {
        this.hasFocus = !this.hasFocus;
      }
    });
    const dropList = this.dragDrop.createDropList(this.elementRef.nativeElement).withItems([dragItem]);
    dropList.lockAxis = 'x';
  }
}
