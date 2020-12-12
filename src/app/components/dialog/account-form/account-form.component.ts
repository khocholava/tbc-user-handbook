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
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AccountFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AccountFormComponent)
    }
  ]
})
export class AccountFormComponent implements OnInit, OnDestroy, ControlValueAccessor, Validators {
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

  createFormGroup() {
    return new FormGroup({
      accountNumber: new FormControl(null, Validators.required),
      clientNumber: new FormControl(null, Validators.required),
      currency: new FormControl('', Validators.required),
      accountStatus: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.valueChangeSubscription.unsubscribe();
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
      accountNumber: null,
      clientNumber: null,
      currency: '',
      accountStatus: '',
    });
  }

}
