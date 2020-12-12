import {AbstractControl} from '@angular/forms';

export function validatePhoneNumber(control: AbstractControl): { [key: string]: boolean | null } {
  const value = control.value;
  if (value.charAt(0) === '5') {
    return {ageRange: true};
  }
  return null;
}
