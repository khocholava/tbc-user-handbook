import {Action, State, StateContext} from '@ngxs/store';
import {UserStateModel} from './user.models';
import {CreateUser, QuerySingleUser, QueryUsers, RemoveUser, UpdateUser} from './user.actions';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    user: null,
  }
})
@Injectable()
export class UserState {
  constructor(
    private userService: UserService
  ) {
  }

  @Action(QueryUsers)
  queryUsers({setState, getState}: StateContext<UserStateModel>) {
    return this.userService.queryUsers()
      .pipe(
        tap(users => {
            const state = getState();
            setState({
              ...state,
              users
            });
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
  createUser({setState, getState}: StateContext<UserStateModel>, {payload}: CreateUser) {
    return this.userService.createUser(payload)
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

  @Action(UpdateUser)
  updateUser({setState, getState}: StateContext<UserStateModel>, {payload}: UpdateUser) {
    return this.userService.createUser(payload).pipe(
      tap(user => {
        const state = getState();
        const userList = [...state.users];
        const userIndex = userList.findIndex(item => item.id === payload.id);
        userList[userIndex] = user;

        setState({
          ...state,
          users: userList
        });
      })
    );
  }

  @Action(RemoveUser)
  removeUser({getState, setState}: StateContext<UserStateModel>, {userId}: RemoveUser) {
    return this.userService.removeUser(userId).pipe(
      tap(() => {
        const state = getState();
        const filteredUsers = state.users.filter(item => item.id === userId);
        setState({
          ...state,
          users: filteredUsers
        });
      })
    );
  }
}
