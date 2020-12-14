import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {validatePhoneNumber, ValidatePId, validNameInput} from '../../../shared/validators';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CreateUser, UpdateUser} from '../../../store/user';
import {DictionarySelectors, QueryGenders} from '../../../store/dictionary';
import {Gender} from '../../../models/user';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @Select(DictionarySelectors.queryGenders)
  genders$: Observable<Array<Gender>>;

  formGroup = this.createFormGroup();
  title$ = new BehaviorSubject<string>('addUser');
  isValid: boolean = false;
  subscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data,
    readonly dialogRef: MatDialogRef<DialogComponent>,
    readonly store: Store,
  ) {
  }

  get accountsFormArray() {
    const accountsFormArray = this.formGroup.controls.account as FormArray;
    return accountsFormArray.controls as Array<FormControl>;
  }

  get image() {
    return this.formGroup.controls.image as FormControl;
  }

  ngOnInit(): void {
    this.store.dispatch(new QueryGenders());

    if (this.data && this.data.account.length > 0) {
      this.title$.next('editUser');
      const accounts = this.data.account.length > 0 ? this.data.account : [undefined];
      this.formGroup.setControl('account', new FormArray(
        accounts.map(account => this.createAccountFormControl(account))
      ));
      this.formGroup.patchValue(this.data);
    } else {
      this.formGroup.setControl('account', new FormArray([
        this.createAccountFormControl()
      ]));
      this.title$.next('addUser');
    }

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(50),
          validNameInput,
          Validators.required,
        ]
      ),
      lastName: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(50),
        validNameInput,
        Validators.required,
      ]),
      image: new FormControl(''),
      phoneNumber: new FormControl('', [
        Validators.required,
        validatePhoneNumber,
      ]),
      gender: new FormControl(),
      personalId: new FormControl('', [
        Validators.required,
        ValidatePId
      ]),
      legalAddress: this.createAddressFormGroup(),
      actualAddress: this.createAddressFormGroup(),
      account: new FormArray([
        this.createAccountFormControl()
      ])
    });
  }

  createAddressFormGroup(): FormControl {
    return new FormControl({
      country: '',
      city: '',
      address: '',
    });
  }

  removeAccountControl(index: number) {
    const accountFormArray = this.formGroup.controls.account as FormArray;
    accountFormArray.removeAt(index);
  }

  createAccountControl(offset: number) {
    const accountFormArray = this.formGroup.controls.account as FormArray;
    accountFormArray.insert(offset, this.createAccountFormControl());
  }

  createAccountFormControl(value?: Account): FormControl {
    return new FormControl(value || {
      accountNumber: null,
      clientNumber: null,
      currency: '',
      accountStatus: '',
    });
  }

  submit() {
    const value = this.formGroup.value;
    if (value.id) {
      this.store.dispatch(new UpdateUser(value)).subscribe(() => {
        this.dialogRef.close(DialogComponent);
      });
    } else {
      this.store.dispatch(new CreateUser(value)).subscribe(() => {
        this.dialogRef.close(DialogComponent);
      });
    }
  }
}
