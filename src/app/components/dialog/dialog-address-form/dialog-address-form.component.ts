import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-address-form',
  templateUrl: './dialog-address-form.component.html',
  styleUrls: ['./dialog-address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DialogAddressFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DialogAddressFormComponent)
    }
  ]
})
export class DialogAddressFormComponent implements OnInit, OnDestroy, ControlValueAccessor, Validators {
  formGroup = this.createFormGroup();
  onChange: (value: any) => any;
  valueChangeSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.valueChangeSubscription = this.formGroup.valueChanges.pipe(
      tap(value => this.onChange && this.onChange(value)),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangeSubscription.unsubscribe();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return undefined;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.formGroup.patchValue(obj || {
      country: '',
      city: '',
      address: '',
    });
  }

}
