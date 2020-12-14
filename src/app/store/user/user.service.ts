import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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


  queryUsers(params?): Observable<Array<User>> {
    const requestParams = Object.keys(params).filter(k => {
      return !!params[k];
    }).reduce((filteredParams, paramName) => {
      filteredParams[paramName] = params[paramName];
      return filteredParams;
    }, {});
    return this.http.get<Array<User>>(`${this.baseUrl}/users`, {
      params: params
        ? requestParams
        : null
    });
  }

  querySingleUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  createUser(payload: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, payload);
  }

  updateUser(payload: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${payload.id}`, payload, headerOption);
  }

  removeUser(userId: number): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/users/${userId}`);
  }

  getUserTotalCount(): Observable<{totalCount: number}> {
    return this.http.get<{totalCount: number}>(`${this.baseUrl}/totalCount`);
  }

  updateUserTotalCount(totalCount: number): Observable<{totalCount: number}> {
    return this.http.put<{totalCount: number}>(`${this.baseUrl}/totalCount`, {totalCount});
  }
}

const headerOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
