import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {validatePhoneNumber} from '../../../shared/utlis';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  formGroup = this.createFormGroup();

  constructor() {
  }

  get accountsFormArray() {
    const accountsFormArray = this.formGroup.controls.account as FormArray;
    return accountsFormArray.controls as Array<FormControl>;
  }

  @Input()
  set data(data: User) {
    if (data) {
      this.formGroup.patchValue(data);
      const accountsFormArray = this.formGroup.controls.account as FormArray;
      if (data.account.length > 0) {
        data.account.forEach(() => {
          accountsFormArray.push(this.createAddressFormGroup());
        });
      }

    } else {
      console.log('no data');
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [Validators.max(50), Validators.min(2), Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl(''),
      phoneNumber: new FormControl('', [validatePhoneNumber, Validators.required]),
      legalAddress: this.createAddressFormGroup(),
      actualAddress: this.createAddressFormGroup(),
      account: new FormArray([
        this.createAccountsFormArray()
      ])
    });
  }

  createAddressFormGroup(data?): FormControl {
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
    accountFormArray.push(this.createAccountsFormArray());
  }

  createAccountsFormArray(): FormControl {
    return new FormControl({
      accountNumber: null,
      clientNumber: null,
      currency: '',
      accountStatus: '',
    });
  }

  ngOnInit(): void {
  }
}
