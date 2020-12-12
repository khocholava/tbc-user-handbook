import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {validatePhoneNumber, validNameInput} from '../../../shared/utlis';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  formGroup = this.createFormGroup();
  @Output() isFormValid = new EventEmitter<boolean>();

  constructor() {
  }

  get accountsFormArray() {
    const accountsFormArray = this.formGroup.controls.account as FormArray;
    return accountsFormArray.controls as Array<FormControl>;
  }

  @Input()
  set data(data: User) {
    const accountFormArray = this.formGroup.controls.account as FormArray;
    if (data && data.account.length > 0) {
      this.formGroup.patchValue(data);
      data.account.forEach(account => {
        accountFormArray.controls.push(this.createAccountFormControl(account));
      });

    } else {
      accountFormArray.controls.push(this.createAccountFormControl());
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
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

  ngOnInit(): void {
    this.formGroup.statusChanges.subscribe((data) => {
        this.isFormValid.emit(data.valid);
      }
    );
  }
}
