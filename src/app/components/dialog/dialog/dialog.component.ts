import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  title$ = new BehaviorSubject<string>('addUser');
  isValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data,
    readonly dialogRef: MatDialogRef<DialogComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.title$.next('editUser');
    } else {
      this.title$.next('addUser');
    }
  }

  isFormValid($event: boolean) {
    this.isValid = $event;
  }
  submit() {
    console.log(this.data);
  }
}
