import {User} from '../../models/user';

export class QueryUsers {
  static readonly type = '[User] Query Users';
  constructor() {
    console.log('Query Users');
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
