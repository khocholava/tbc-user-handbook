import {User} from '../../models/user';
import {UserQueryParams} from './user.types';

export class QueryUsers {
  static readonly type = '[User] Query Users';

  constructor(readonly payload?: UserQueryParams) {
  }
}

export class QuerySingleUser {
  static readonly type = '[User] Query Single User';

  constructor(readonly userId: number) {
  }
}

export class CreateUser {
  static readonly type = '[User] Create User';

  constructor(readonly payload: User) {
  }
}

export class UpdateUser {
  static readonly type = '[User] Update User';

  constructor(readonly payload: User) {
  }
}

export class RemoveUser {
  static readonly type = '[User] Remove User';

  constructor(readonly userId: number) {
  }
}

export class GetTotalCount {
  static readonly type = '[User] Get Total User Count';

  constructor() {
  }
}

export class UpdateTotalCount {
  static readonly type = '[User] Get Total Count';

  constructor(readonly count: number) {
  }
}
