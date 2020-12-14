import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngxs/store';
import {RemoveUser} from '../../../store/user';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss'],
})
export class ConfirmationBoxComponent implements OnInit {
  @Output() positiveTextClick = new EventEmitter<any>();

  constructor(
    readonly store: Store,
    @Inject(MAT_DIALOG_DATA) readonly data,
    readonly dialogRef: MatDialogRef<ConfirmationBoxComponent>,
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  handleRemove() {
    this.store.dispatch(new RemoveUser(this.data.id));
  }
}
