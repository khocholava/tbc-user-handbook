import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {DictionarySelectors, QueryGenders} from '../../../store/dictionary';
import {Observable} from 'rxjs';
import {Gender} from '../../../models/user';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  @Output() closePopover = new EventEmitter<any>();

  @Select(DictionarySelectors.queryGenders)
  genders$: Observable<Array<Gender>>;

  formGroup = this.createFormGroup();

  constructor(
    readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new QueryGenders());
  }

  createFormGroup() {
    return new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      personalId: new FormControl(''),
      phoneNumber: new FormControl(''),
      gender: new FormControl(''),
    });
  }

  close() {
    this.closePopover.emit(
      this.formGroup.reset()
    );
  }

  submit() {
    this.search.emit(this.formGroup.value);
  }
}
