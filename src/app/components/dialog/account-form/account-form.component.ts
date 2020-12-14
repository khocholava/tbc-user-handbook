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
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {DictionarySelectors, QueryAccountStatusTypes, QueryAccountTypes, QueryCurrencyTypes} from '../../../store/dictionary';
import {AccountStatusType, AccountType, CurrencyType} from '../../../models/account';

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
  @Select(DictionarySelectors.getAccountStatusTypes)
  accountStatus$: Observable<Array<AccountStatusType>>;

  @Select(DictionarySelectors.getAccountTypes)
  accountTypes$: Observable<Array<AccountType>>;

  @Select(DictionarySelectors.getCurrencyTypes)
  currencyTypes$: Observable<Array<CurrencyType>>;

  formGroup = this.createFormGroup();
  onChange: (value: any) => any;
  valueChangeSubscription: Subscription;

  constructor(
    readonly store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new QueryAccountStatusTypes());
    this.store.dispatch(new QueryCurrencyTypes());
    this.store.dispatch(new QueryAccountTypes());
    this.valueChangeSubscription = this.formGroup.valueChanges.pipe(
      tap(value => this.onChange && this.onChange(value))
    ).subscribe();
  }

  createFormGroup() {
    return new FormGroup({
      accountNumber: new FormControl(null, Validators.required),
      clientNumber: new FormControl(null, Validators.required),
      currency: new FormControl('', Validators.required),
      accountStatus: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
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
