import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {TranslocoService} from '@ngneat/transloco';

@Pipe({
  name: 'inputError'
})
export class InputErrorPipe implements PipeTransform {
  message = '';

  constructor(
    private translocoService: TranslocoService
  ) {
  }

  transform(value: ValidationErrors, ...args: unknown[]): unknown {
    const messageKey = Object.keys(value);
    for (const mes of messageKey) {
      this.message = this.translocoService.translate(mes);
    }
    return this.message;
  }

}
