import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Actions, Select, Store} from '@ngxs/store';
import {UserSelectors} from '../../store/user/user.selectors';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../models/user';
import {QueryUsers} from '../../store/user';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';
import {MatSort, Sort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {UserQueryParams} from '../../store/user/user.types';
import {FormControl, FormGroup} from '@angular/forms';
import {filter, tap} from 'rxjs/operators';
import {MdePopoverTrigger} from '@material-extended/mde';
import {ConfirmationBoxComponent} from '../dialog/confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(UserSelectors.getUsers)
  users$: Observable<Array<User>> | undefined;
  param: UserQueryParams = {};
  @Select(UserSelectors.getTotalCount)
  totalCount$: Observable<number>;

  @ViewChild(MdePopoverTrigger) trigger: MdePopoverTrigger;
  formGroup = this.createFormGroup();
  subscription = new Subscription();
  dataSource = new MatTableDataSource<User>();
  matRowDef: Array<string> = [
    'image', 'firstName', 'lastName', 'phoneNumber',
    'legalAddress.country', 'actions'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 5;
  pageSizeOptions = [5, 10, 15];
  pageIndex = 1;
  pageLimit;

  constructor(
    readonly store: Store,
    readonly dialog: MatDialog,
    private actions$: Actions,
    private matSnackbar: MatSnackBar,
    private translocoService: TranslocoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(route => {
      if (route.page) {
        this.pageIndex = route.page;
      }
      if (route.pageSize) {
        this.pageSize = route.pageSize;
      }
    });
    this.onSearchChange();
    // this.queryData();
  }

  createFormGroup() {
    return new FormGroup({
      search: new FormControl('')
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit(row) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row,
    });
  }
  openAddDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%'
    });
  }

  queryData() {
    this.store.dispatch(new QueryUsers(
      {_page: this.pageIndex, _limit: this.pageSize, ...this.param}));
  }

  onSearchChange() {
    this.formGroup.controls.search.valueChanges.pipe(
      tap(data => {
        this.param = {
          firstName: data
        };
        this.pageIndex = 1;
        this.queryData();
      }),
      filter(data => data === ''),
      tap(() => {
        this.param = {};
        this.pageIndex = 1;
        this.queryData();
      })
    ).subscribe();
  }

  detailSearch($event: any) {
    this.param = $event;
    this.pageIndex = 1;
    this.queryData();
    this.router.navigate(['/'], {
      queryParams: {
        name: $event.firstName,
        lastname: $event.lastName,
        personalId: $event.personalId,
        gender: $event.gender,
      }
    });
  }

  closePopover($event) {
    this.trigger.closePopover();
  }

  onSortChange($event: Sort) {
    if ($event) {
      this.param = {
        _sort: $event.active,
        _order: $event.direction,
      };
    }
    this.pageIndex = 1;
    this.queryData();

    this.router.navigate(['/'], {
      queryParams: {
        direction: $event.active,
        order: $event.direction
      }
    });
  }

  onPageChange($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex + 1;
    this.queryData();
    this.router.navigate(['/'], {
      queryParams: {
        page: $event.pageIndex + 1,
        pageSize: $event.pageSize
      }
    });
  }

  openRemovalDialog(row?) {
    this.dialog.open(ConfirmationBoxComponent, {
      data: row,
    });
  }
}
