import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {UserSelectors} from '../../store/user/user.selectors';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {QueryUsers, RemoveUser} from '../../store/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Select(UserSelectors.getUsers)
  users$: Observable<Array<User>> | undefined;
  dataSource = new MatTableDataSource<User>();
  matRowDef: Array<string> = [
    'image', 'firstName', 'lastName', 'phoneNumber',
    'legalAddress.country', 'actions'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    readonly store: Store,
    readonly dialog: MatDialog,
    private actions$: Actions,
    private matSnackbar: MatSnackBar,
    private translocoService: TranslocoService,
  ) {
    this.actions$.pipe(
      ofActionSuccessful(RemoveUser)
    ).subscribe(() => {
      this.store.dispatch(new QueryUsers()).subscribe(() => {
        this.matSnackbar.open(
          this.translocoService.translate('messages.successfullyDeleted'),
          this.translocoService.translate('close'),
          {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          }
        );
      });
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.store.dispatch(new QueryUsers());
  }

  edit(row) {
    console.log(row);
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row
    });
  }

  removeUser(userId) {
    this.store.dispatch(new RemoveUser(userId));
  }

  openAddDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%'
    });
  }
}
