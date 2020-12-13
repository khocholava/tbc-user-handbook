import {Selector} from '@ngxs/store';
import {UserStateModel} from './user.models';
import {UserState} from './user.state';

export class UserSelectors {
  @Selector([UserState])
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Selector([UserState])
  static getUser(state: UserStateModel) {
    return state.user;
  }

  @Selector([UserState])
  static getTotalCount(state: UserStateModel) {
    return state.totalCount;
  }
}
