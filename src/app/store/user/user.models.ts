import {User} from '../../models/user';

export interface UserStateModel {
  users: Array<User>;
  user: User | null;
  totalCount: number | null;
  page: number;
  pageSize: number;
}
