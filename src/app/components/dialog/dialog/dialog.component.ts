import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {validatePhoneNumber, validNameInput} from '../../../shared/utlis';
import {BehaviorSubject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Actions, ofActionSuccessful, Store} from '@ngxs/store';
import {CreateUser, QueryUsers, UpdateUser} from '../../../store/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';

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
    readonly store: Store,
    private actions$: Actions,
    private matSnackbar: MatSnackBar,
    private translocoService: TranslocoService,
  ) {
    this.actions$.pipe(
      ofActionSuccessful(CreateUser)
    ).subscribe(() => {
      this.store.dispatch(new QueryUsers()).subscribe(() => {
        this.dialogRef.close();
        this.matSnackbar.open(
          this.translocoService.translate('messages.successfullyCreated'),
          this.translocoService.translate('close'),
          {
            duration: 2000,
            panelClass: 'success-dialog',
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          }
        );
      });
    });
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
    const value = this.formGroup.value;
    if (value.id) {
      this.store.dispatch(new UpdateUser(value));
    } else {
      this.store.dispatch(new CreateUser(value));
    }
  }

  ngOnInit(): void {
    const accountFormArray = this.formGroup.controls.account as FormArray;
    if (this.data && this.data.account.length > 0) {
      this.title$.next('editUser');
      this.formGroup.patchValue(this.data);
      accountFormArray.clear();
      this.data.account.forEach(account => {
        console.log(account);
        accountFormArray.controls.push(this.createAccountFormControl(account));
      });
    } else {
      this.title$.next('addUser');
    }
  }
}
