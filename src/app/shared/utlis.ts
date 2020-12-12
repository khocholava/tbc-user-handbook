import {AbstractControl} from '@angular/forms';

const GeoRegex = /[ა-ჰ]/;
const EnRegex = /[a-zA-Z]/;

export function validatePhoneNumber(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (value.charAt(0) !== '5' || value.length !== 9) {
    return {numberRange: true};
  }
  return null;
}

export function validNameInput(control: AbstractControl): { [key: string]: boolean } | null {
  if (GeoRegex.test(control.value) && EnRegex.test(control.value)) {
    return {invalidName: true};
  }
  return null;
}
