import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserSelectors} from '../../store/user/user.selectors';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {QueryUsers} from '../../store/user';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Select(UserSelectors.getUsers)
  users$: Observable<Array<User>> | undefined;
  dataSource = new MatTableDataSource<User>();
  matRowDef: Array<string> = [
    'image', 'firstName', 'lastName', 'phoneNumber',
    'legalAddress.country', 'actions'
  ];

  constructor(
    readonly store: Store,
    readonly dialog: MatDialog
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.store.dispatch(new QueryUsers());
  }

  edit(row) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row
    });
  }

}
