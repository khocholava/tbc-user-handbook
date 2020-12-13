import {Component, ElementRef, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {ControlValueAccessor, FormControl, NgControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, ControlValueAccessor, Validators {
  @Input() label: string = 'Select';
  @Input() hint: string;
  @Input() data: Array<DictionaryItems>;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @ViewChild('select', {static: false}) select: ElementRef;
  options$ = new BehaviorSubject<Array<DictionaryItems>>([]);
  onChange: (value?: any) => void;
  onTouched: (event?: any) => void;
  formControl = new FormControl();
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

  @Input()
  set options(options: Array<string | number | DictionaryItems>) {
    if (!options && options.length === 0) {
      return;
    }
    console.log(options);
    this.data = options.map(option => typeof option === 'object' ? option : {
      id: option,
      value: option.toString(),
    });

  }

  ngOnInit(): void {
    this.control = this.ngControl && this.ngControl.control
      ? this.ngControl.control as FormControl
      : new FormControl();
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
    this.select.nativeElement.focus();
  }

}

export interface DictionaryItems {
  id: number | string;
  value: string;
}
