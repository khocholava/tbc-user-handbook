import {AfterViewInit, Component, ElementRef, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, ControlValueAccessor, AfterViewInit, Validators {

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
  _value: string;
  control: FormControl;

  constructor(
    readonly matcher: ErrorStateMatcher,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control = this.ngControl && this.ngControl.control
      ? this.ngControl.control as FormControl
      : new FormControl();
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

