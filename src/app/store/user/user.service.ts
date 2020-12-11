import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {API_BASE_URL} from '../../tokens';

@Injectable()
export class UserService {

  constructor(
    readonly http: HttpClient,
    @Inject(API_BASE_URL) readonly baseUrl: string
  ) {
  }

  queryUsers(): Observable<Array<User>> {
    console.log('service');
    return this.http.get<Array<User>>(`${this.baseUrl}/users`);
  }

  querySingleUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  createUser(payload: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, payload);
  }

  updateUser(payload: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users`, payload);
  }

  removeUser(userId: number): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/users/${userId}`);
  }
}
