import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../../models/user';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  formGroup = this.createFormGroup();

  constructor() {
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl('')
    });
  }

  @Input()
  set data(data: User) {
    if (data) {
      this.formGroup.patchValue(data);
    } else {
      console.log('no data');
    }
  }

  ngOnInit(): void {
  }
}
