import {Action, State, StateContext} from '@ngxs/store';
import {UserStateModel} from './user.models';
import {CreateUser, GetTotalCount, QuerySingleUser, QueryUsers, RemoveUser, UpdateTotalCount, UpdateUser} from './user.actions';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    user: null,
    totalCount: null,
    page: null,
    pageSize: null,
  }
})
@Injectable()
export class UserState {
  constructor(
    private userService: UserService,
    private matSnackbar: MatSnackBar,
    private translocoService: TranslocoService,
  ) {
  }

  @Action(GetTotalCount)
  getTotalCount({setState, getState}: StateContext<UserStateModel>) {
    return this.userService.getUserTotalCount().pipe(
      tap((totalCount) => {
        const state = getState();
        setState({
          ...state,
          totalCount: totalCount.totalCount,
        });
      })
    );
  }

  @Action(UpdateTotalCount)
  updateTotalCount({setState, getState}: StateContext<UserStateModel>, {count}: UpdateTotalCount) {
    return this.userService.updateUserTotalCount(count).pipe(
      tap((totalCount) => {
        const state = getState();
        setState({
          ...state,
          totalCount: totalCount.totalCount
        });
      })
    );
  }

  @Action(QueryUsers)
  queryUsers({setState, getState, dispatch}: StateContext<UserStateModel>, {payload}: QueryUsers) {
    return this.userService.queryUsers(payload)
      .pipe(
        tap(users => {
            const state = getState();
            setState({
              ...state,
              users,
              page: payload._page,
              pageSize: payload._limit,
            });
            dispatch(new GetTotalCount());
          }
        )
      );
  }

  @Action(QuerySingleUser)
  querySingleUser({setState, getState}: StateContext<UserStateModel>, action: QuerySingleUser) {
    return this.userService.querySingleUser(action.userId)
      .pipe(
        tap(user => {
          const state = getState();
          setState({
            ...state,
            user
          });
        })
      );
  }

  @Action(CreateUser)
  createUser({setState, getState, dispatch}: StateContext<UserStateModel>, {payload}: CreateUser) {
    return this.userService.createUser(payload)
      .pipe(
        tap(user => {
          const state = getState();
          setState({
            ...state,
            user
          });
          dispatch(new QueryUsers({_page: state.page, _limit: state.pageSize})).subscribe(() => {
            this.matSnackbar.open(
              this.translocoService.translate('messages.successfullyCreated'),
              this.translocoService.translate('close'),
              {
                duration: 2000,
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              }
            );
          });
          dispatch(new UpdateTotalCount(state.totalCount + 1));
        })
      );
  }

  @Action(UpdateUser)
  updateUser({setState, getState, dispatch}: StateContext<UserStateModel>, {payload}: UpdateUser) {
    return this.userService.updateUser(payload).pipe(
      tap(user => {
        const state = getState();
        const userList = [...state.users];
        const userIndex = userList.findIndex(item => item.id === payload.id);
        userList[userIndex] = user;

        setState({
          ...state,
          users: userList
        });
        dispatch(new QueryUsers({_page: state.page, _limit: state.pageSize})).subscribe(() => {
          this.matSnackbar.open(
            this.translocoService.translate('messages.successfullyCreated'),
            this.translocoService.translate('close'),
            {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            }
          );
        });
      })
    );
  }

  @Action(RemoveUser)
  removeUser({getState, setState, dispatch}: StateContext<UserStateModel>, {userId}: RemoveUser) {
    return this.userService.removeUser(userId).pipe(
      tap(() => {
        const state = getState();
        const filteredUsers = state.users.filter(item => item.id === userId);
        setState({
          ...state,
          users: filteredUsers
        });
        dispatch(new QueryUsers({_page: state.page, _limit: state.pageSize})).subscribe(() => {
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
        dispatch(new UpdateTotalCount(state.totalCount - 1));
      }),
    );
  }
}
