import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {validatePhoneNumber, validNameInput} from '../../../shared/utlis';
import {BehaviorSubject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngxs/store';
import {UpdateUser} from '../../../store/user';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  formGroup = this.createFormGroup();
  title$ = new BehaviorSubject<string>('addUser');
  isValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data,
    readonly dialogRef: MatDialogRef<DialogComponent>,
    readonly store: Store
  ) {
  }


  get accountsFormArray() {
    const accountsFormArray = this.formGroup.controls.account as FormArray;
    return accountsFormArray.controls as Array<FormControl>;
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [
          Validators.minLength(5),
          validNameInput,
          Validators.required,
        ]
      ),
      lastName: new FormControl('', [
        Validators.minLength(5),
        validNameInput,
        Validators.required,
      ]),
      phoneNumber: new FormControl('', [validatePhoneNumber, Validators.required]),
      legalAddress: this.createAddressFormGroup(),
      actualAddress: this.createAddressFormGroup(),
      account: new FormArray([])
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

  createAccountControl() {
    const accountFormArray = this.formGroup.controls.account as FormArray;
    accountFormArray.push(this.createAccountFormControl());
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
    console.log(this.formGroup.value);
    const value = this.formGroup.value;
    if (value) {
      this.store.dispatch(new UpdateUser(value));
    } else {
      console.log('asdasd');
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.title$.next('editUser');
    } else {
      this.title$.next('addUser');
    }
    const accountFormArray = this.formGroup.controls.account as FormArray;
    if (this.data && this.data.account.length > 0) {
      this.formGroup.patchValue(this.data);
      this.data.account.forEach(account => {
        accountFormArray.controls.push(this.createAccountFormControl(account));
      });

    } else {
      accountFormArray.controls.push(this.createAccountFormControl());
    }
  }
}
