import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input() autofocus: boolean = false;
  @Input() autocomplete: boolean = false;
  @Input() label: string;
  @Input() readonly?: boolean = false;
  @Input() icon: string;
  @Input() hint: string;
  @Input() type: InputType = 'text';
  onChange: (value?: any) => void;
  onTouched: (event?: any) => void;
  @ViewChild('input', {static: false}) input: ElementRef;
  formControl = new FormControl();
  subscription: Subscription;

  constructor() {
  }

  _value: string;

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.autofocus) {
      this.onFocus();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this._value = value;
  }


  handleChange(event) {
    this.onChange(event);
    this.onTouched();
  }


  onFocus() {
    this.input.nativeElement.focus();
  }

}

export type InputType =
  | 'password'
  | 'number'
  | 'text'
  | 'hidden';

